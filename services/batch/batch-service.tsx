import {Batch} from '@/models/batch'
import {QueryKey, UseQueryOptions, UseQueryResult} from '@tanstack/react-query'

export const BATCHES_QUERY_KEY: QueryKey = ['batches']
export const BATCHES_STORAGE_KEY = '@batches'

export type BatchQueryOptions = Partial<UseQueryOptions<Batch[], Error, Batch[], QueryKey>>

export interface BatchServiceInterface {
    allBatches(options?: BatchQueryOptions): UseQueryResult<Batch[], Error>

    activeBatches(options?: BatchQueryOptions): UseQueryResult<Batch[], Error>

    archivedBatches(options?: BatchQueryOptions): UseQueryResult<Batch[], Error>

    getBatchById(id: number): Promise<Batch | null>

    addBatch(batch: Batch): Promise<void>

    updateBatch(batch: Batch): Promise<void>

    deleteBatch(id: number): Promise<void>
}
