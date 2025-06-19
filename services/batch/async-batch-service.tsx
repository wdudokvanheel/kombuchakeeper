import {Batch} from "@/models/batch"
import {
    BATCHES_QUERY_KEY,
    BATCHES_STORAGE_KEY,
    BatchQueryOptions,
    BatchServiceInterface
} from "@/services/batch/batch-service"
import NotificationService from "@/services/notification-service"
import {queryClient} from "@/services/query-client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useQuery, UseQueryResult} from "@tanstack/react-query"

export default class AsyncStorageBatchService implements BatchServiceInterface {

    constructor(private readonly notifications: NotificationService) {
        this.resetAllNotifications()
    }

    private async resetAllNotifications(): Promise<void> {
        await this
            .fetchRaw()
            .then(async (batches) => {
                    const incompleteBatches =  batches.filter((b) => !b.hasEnded())
                    await this.notifications.wipeAllBatchNotifications()
                    await this.notifications.refreshAllBatchNotifications(incompleteBatches)
                }
            )
    }

    private parseDates(obj: any): Batch {
        return new Batch({
            ...obj,
            createdAt: new Date(obj.createdAt),
            firstFermentationEnd: obj.firstFermentationEnd ? new Date(obj.firstFermentationEnd) : undefined,
            secondFermentationEnd: obj.secondFermentationEnd ? new Date(obj.secondFermentationEnd) : undefined
        })
    }

    private async fetchRaw(): Promise<Batch[]> {
        const json = await AsyncStorage.getItem(BATCHES_STORAGE_KEY)
        if (json) {
            const parsed: any[] = JSON.parse(json)
            return parsed.map(p => this.parseDates(p))
        }
        return []
    }

    private async saveRaw(batches: Batch[]) {
        await AsyncStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(batches))
        queryClient.invalidateQueries({queryKey: BATCHES_QUERY_KEY})
    }

    private async createNextId(): Promise<number> {
        const batches = await this.fetchRaw()
        if (batches.length === 0) {
            return 1
        }
        return Math.max(...batches.map(b => b.id || 0)) + 1
    }

    async fetchBatches(): Promise<Batch[]> {
        return await this.fetchRaw()
    }

    async getBatchById(id: number): Promise<Batch | null> {
        const batches = await this.fetchRaw()
        const found = batches.find(b => b.id === id)
        return found ?? null
    }

    async addBatch(batch: Batch): Promise<void> {
        const batches = await this.fetchRaw()
        if (batch.id === undefined) {
            batch.id = await this.createNextId()
        }
        batches.push(batch)
        await this.saveRaw(batches)
        await this.notifications.rescheduleBatchNotification(batch)
    }

    async updateBatch(batch: Batch): Promise<void> {
        const batches = await this.fetchRaw()
        const idx = batches.findIndex(b => b.id === batch.id)
        if (idx >= 0) {
            batches[idx] = batch
            await this.saveRaw(batches)
            await this.notifications.rescheduleBatchNotification(batch)
        }
    }

    async deleteBatch(id: number): Promise<void> {
        const batches = await this.fetchRaw()
        const filtered = batches.filter(b => b.id !== id)
        await this.saveRaw(filtered)
        await this.notifications.cancelBatchNotification(id)
    }

    allBatches(options?: BatchQueryOptions): UseQueryResult<Batch[], Error> {
        return useQuery<Batch[], Error>({
            queryKey: BATCHES_QUERY_KEY,
            queryFn: () => this.fetchBatches(),
            ...options
        })
    }

    activeBatches(options?: BatchQueryOptions): UseQueryResult<Batch[], Error> {
        return useQuery<Batch[], Error>({
            queryKey: [...BATCHES_QUERY_KEY, 'active'],
            queryFn: async () => (await this.fetchBatches()).filter(b => !b.hasEnded()),
            ...options
        })
    }

    archivedBatches(options?: BatchQueryOptions): UseQueryResult<Batch[], Error> {
        return useQuery<Batch[], Error>({
            queryKey: [...BATCHES_QUERY_KEY, 'archived'],
            queryFn: async () => (await this.fetchBatches()).filter(b => b.hasEnded()),
            ...options
        })
    }
}


