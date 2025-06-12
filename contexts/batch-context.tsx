import {Batch} from "@/models/batch";
import {createContext, ReactNode, useContext} from 'react'

const BatchContext = createContext<Batch | undefined>(undefined)

export const BatchProvider = ({batch, children}: { batch: Batch; children: ReactNode }) => {
    return (
        <BatchContext.Provider value={batch}>
            {children}
        </BatchContext.Provider>
    )
}

export const useBatch = () => {
    const ctx = useContext(BatchContext)
    if (!ctx) {
        throw new Error('useBatch must be used within BatchProvider')
    }
    return ctx
}