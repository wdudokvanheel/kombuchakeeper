import {BatchServiceInterface} from "@/services/batch-service"
import React, {createContext, useContext} from 'react'

const BatchServiceContext = createContext<BatchServiceInterface | null>(null)

export function BatchServiceProvider({
                                         service,
                                         children,
                                     }: {
    service: BatchServiceInterface
    children: React.ReactNode
}) {
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