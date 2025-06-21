import {useNotificationService} from "@/contexts/notification-context"
import AsyncStorageBatchService from "@/services/batch/async-batch-service"
import {BatchServiceInterface} from "@/services/batch/batch-service"
import React, {createContext, useContext, useMemo} from 'react'

const BatchServiceContext = createContext<BatchServiceInterface | null>(null)

export function BatchServiceProvider({children}: { children: React.ReactNode }) {

    const notifications = useNotificationService()

    const service = useMemo(() => new AsyncStorageBatchService(notifications), [notifications])
    // const service = new MockBatchService()

    return (
        <BatchServiceContext.Provider value={service}>
            {children}
        </BatchServiceContext.Provider>
    )
}

export function useBatchService() {
    const svc = useContext(BatchServiceContext)
    if (!svc) {
        throw new Error('useBatchService must be used within BatchServiceProvider')
    }
    return svc
}