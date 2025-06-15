import {useMenu} from "@/contexts/menubar-context"
import {BatchService} from "@/services/batch-service"
import React from 'react'
import BatchList from './batch-list'

const Index = () => {
    const {page} = useMenu()

    const {data: active = []} = BatchService.activeBatches({enabled: page !== 'archive'})
    const {data: archived = []} = BatchService.archivedBatches({enabled: page === 'archive'})

    const listData = page === 'archive' ? archived : active

    return <BatchList data={listData}/>
}
export default Index

