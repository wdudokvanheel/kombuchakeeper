import {useMenu} from "@/contexts/menubar-context"
import {BatchService} from "@/services/batch-service"
import Text from "@/ui/components/text"
import React from 'react'
import BatchList from './batch-list'

const Index = () => {
    const {page} = useMenu()

    const archive = page === 'archive'

    const {data: active = []} = BatchService.activeBatches({enabled: !archive})
    const {data: archived = []} = BatchService.archivedBatches({enabled: archive})

    if (archive) {
        return (
            <BatchList data={archived}>
                <Text className="text-3xl font-semibold text-brown-900">
                    No archived batches found
                </Text>
                <Text className="text-xl font-medium text-brown-800 text-center" >
                    Batches that have ended will show up here
                </Text>
            </BatchList>
        )
    } else {
        return (
            <BatchList data={active}>
                <Text className="text-3xl font-semibold text-brown-900">
                    No active batches found
                </Text>
                <Text className="text-xl font-medium text-brown-800">
                    Click the 'Plus'-button below start a new one
                </Text>
            </BatchList>
        )
    }
}
export default Index

