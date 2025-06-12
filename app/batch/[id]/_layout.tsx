import {BatchProvider} from "@/contexts/batch-context"
import {Batch} from "@/models/batch"
import {BatchService} from "@/services/batch-service"
import Text from "@/ui/components/text"
import {Stack, useLocalSearchParams} from "expo-router"
import {useEffect, useState} from "react"
import {ActivityIndicator, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

export default function BatchLayout() {
    const insets = useSafeAreaInsets()

    const {id} = useLocalSearchParams()
    const [batch, setBatch] = useState<Batch | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }

        BatchService.getBatchById(Number(id))
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
                <Text>Batch not found</Text>
            </View>
        )
    }
    return (
        <BatchProvider batch={batch}>
            <View
                className="flex-1 bg-white"
                style={{
                    paddingBottom: Math.max(insets.bottom, 16)
                }}
            >
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name="index"
                    />
                    <Stack.Screen
                        name="actions"
                        options={{presentation: 'modal'}}
                    />
                </Stack>
            </View>
        </BatchProvider>
    )
}