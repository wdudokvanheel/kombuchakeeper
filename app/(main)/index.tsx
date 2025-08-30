import {useBatchService} from "@/contexts/batch-service-context"
import {useMenu} from "@/contexts/menubar-context"
import Text from "@/ui/components/text"
import React from 'react'
import BatchList from './batch-list'
import {useTranslation} from 'react-i18next'

const Index = () => {
    const {page} = useMenu()
    const batchService = useBatchService()
    const {t} = useTranslation()

    const archive = page === 'archive'

    const {data: active = []} = batchService.activeBatches({enabled: !archive})
    const {data: archived = []} = batchService.archivedBatches({enabled: archive})

    if (archive) {
        return (
            <BatchList data={archived}>
                <Text className="w-full text-3xl font-semibold text-brown-900 text-center">
                    {t('index.noArchivedBatches')}
                </Text>
                <Text className="w-full text-xl font-medium text-brown-800 text-center">
                    {t('index.archivedBatchesHint')}
                </Text>
            </BatchList>
        )
    } else {
        return (
            <BatchList data={active}>
                <Text className="w-full text-3xl font-semibold text-brown-900 text-center">
                    {t('index.noActiveBatches')}
                </Text>
                <Text className="w-full text-xl font-medium text-brown-800 text-center">
                    {t('index.activeBatchesHint')}
                </Text>
            </BatchList>
        )
    }
}
export default Index

