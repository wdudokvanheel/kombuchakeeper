import {BatchProvider} from "@/contexts/batch-context"
import {useBatchService} from "@/contexts/batch-service-context"
import {Batch} from "@/models/batch"
import Text from "@/ui/components/text"
import {Stack, useLocalSearchParams} from "expo-router"
import {useEffect, useState} from "react"
import {ActivityIndicator, View} from "react-native"
import {useTranslation} from 'react-i18next'

const BatchLayout = () => {
    const batchService = useBatchService()

    const {id} = useLocalSearchParams()
    const [batch, setBatch] = useState<Batch | null>(null)
    const [loading, setLoading] = useState(true)
    const {t} = useTranslation()

    useEffect(() => {
        if (!id) {
            return
        }

        batchService.getBatchById(Number(id))
            .then(b => {
                setBatch(b)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    if (!batch) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text>{t('batchDetail.notFound')}</Text>
            </View>
        )
    }
    return (
        <BatchProvider batch={batch}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="index"
                />
                <Stack.Screen
                    name="notes"
                    options={{presentation: 'modal'}}
                />
                <Stack.Screen
                    name="actions"
                    options={{presentation: 'modal'}}
                />
            </Stack>
        </BatchProvider>
    )
}

export default BatchLayout
