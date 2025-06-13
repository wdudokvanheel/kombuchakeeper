import ActionBody from "@/app/batch/[id]/actions/components/action-body"
import {useBatch} from "@/contexts/batch-context"
import {BatchState} from "@/models/batch"
import {BatchService} from "@/services/batch-service"
import SimpleHeader from "@/ui/components/simple-header"
import Text from "@/ui/components/text"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"

const CompleteBatch = () => {
    const router = useRouter()
    const batch = useBatch()

    const handleComplete = () => {
        console.log(`Completing batch #${batch.id}[${batch.state}]`)

        batch.state = BatchState.Bottled
        BatchService.updateBatch(batch)

        // TODO Handle this is a less hacky way?
        router.back()
        router.back()
    }

    return (
        <>
            <SimpleHeader title="Batch complete" />

            <ActionBody>
                <View className="flex-1 justify-between">
                    <Text className="text-4xl text-brown-800 font-extrabold mb-8 text-center">
                    </Text>

                    <View>
                        <TouchableOpacity
                            onPress={handleComplete}
                            className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                        >
                            <Text className="text-white text-2xl font-semibold">Mark batch as complete</Text>
                            <Ionicons name="checkmark" size={28} color="white" className="ml-2"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionBody>
        </>
    )
}
export default CompleteBatch
