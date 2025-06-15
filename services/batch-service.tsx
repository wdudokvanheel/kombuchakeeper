import {Batch, BatchState} from '@/models/batch'
import {queryClient} from '@/services/query-client'
import {QueryKey, useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query'

export const BATCHES_QUERY_KEY: QueryKey = ['batches']

type QueryOptions = Partial<UseQueryOptions<Batch[], Error, Batch[], QueryKey>>

export interface BatchServiceInterface {
    allBatches(options?: QueryOptions): UseQueryResult<Batch[], Error>

    activeBatches(options?: QueryOptions): UseQueryResult<Batch[], Error>

    archivedBatches(options?: QueryOptions): UseQueryResult<Batch[], Error>

    getBatchById(id: number): Promise<Batch | null>

    addBatch(batch: Batch): Promise<void>

    updateBatch(batch: Batch): Promise<void>

    deleteBatch(id: number): Promise<void>
}

class MockBatchService implements BatchServiceInterface {
    private batches: Batch[] = []

    constructor() {
        const today = new Date()
        const d = (days: number) => new Date(today.getTime() + days * 86_400_000)

        this.batches = [
            new Batch({
                id: 1,
                name: 'Already Started',
                createdAt: d(-5),
                state: BatchState.F1,
                firstFermentationEnd: d(14),
                notes: "This is my first batch, I'm still learning but I think I did put some tea and sugar in a pot. Hopefully the Kombucha will magically appear. I've added 24 bottles of store bought Kombucha just to be sure there is some Kombucha culture inside."
            }),
            new Batch({
                id: 2,
                name: 'Today’s F2 Target',
                createdAt: d(-18),
                state: BatchState.F2,
                firstFermentationEnd: d(-6),
                secondFermentationEnd: d(0)
            }),
            new Batch({
                id: 3,
                name: 'F2 In Progress',
                createdAt: d(-10),
                state: BatchState.F2,
                firstFermentationEnd: d(-5),
                secondFermentationEnd: d(2)
            }),
            new Batch({
                id: 4,
                name: 'Today’s F1 Target',
                createdAt: d(-10),
                state: BatchState.F1,
                firstFermentationEnd: d(0)
            }),
            new Batch({
                id: 5,
                name: 'Completed Batch',
                createdAt: d(-15),
                state: BatchState.Bottled,
                firstFermentationEnd: d(-10),
                secondFermentationEnd: d(-5),
                notes: 'Tastes great—bottled 5 days ago and stored cold.'
            }),
            new Batch({
                id: 6,
                name: 'Failed Attempt',
                createdAt: d(-10),
                state: BatchState.Failed,
                notes: 'Mold appeared midway through F1.'
            }),
        ]

        this.updateBatches()
    }

    private updateBatches() {
        queryClient.invalidateQueries({queryKey: BATCHES_QUERY_KEY})
    }

    private createNextId() {
        return this.batches.length ? Math.max(...this.batches.map(b => b.id)) + 1 : 1
    }

    async fetchBatches(): Promise<Batch[]> {
        return [...this.batches]
    }

    async getBatchById(id: number): Promise<Batch | null> {
        const found = this.batches.find((b) => b.id === id)
        return found ?? null
    }

    async addBatch(batch: Batch): Promise<void> {
        if (batch.id === undefined) {
            batch.id = this.createNextId()
        }

        this.batches.push(batch)
        this.updateBatches()
    }

    async updateBatch(updated: Batch): Promise<void> {
        const index = this.batches.findIndex((b) => b.id === updated.id)
        if (index >= 0) {
            this.batches[index] = updated
            this.updateBatches()
        }
    }

    async deleteBatch(id: number): Promise<void> {
        this.batches = this.batches.filter((b) => b.id !== id)
        this.updateBatches()
    }

    allBatches(options?: QueryOptions) {
        return useQuery<Batch[], Error>({
            queryKey: BATCHES_QUERY_KEY,
            queryFn: () => this.fetchBatches(),
            ...options,
        })
    }

    activeBatches(options?: QueryOptions) {
        return useQuery<Batch[], Error>({
            queryKey: [...BATCHES_QUERY_KEY, 'active'],
            queryFn: async () =>
                (await this.fetchBatches()).filter(b => !b.hasEnded()),
            ...options,
        })
    }

    archivedBatches(options?: QueryOptions) {
        return useQuery<Batch[], Error>({
            queryKey: [...BATCHES_QUERY_KEY, 'archived'],
            queryFn: async () =>
                (await this.fetchBatches()).filter(b => b.hasEnded()),
            ...options,
        })
    }
}

export const BatchService: BatchServiceInterface = new MockBatchService()
