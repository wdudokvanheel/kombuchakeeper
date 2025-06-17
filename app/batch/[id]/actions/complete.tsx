import ActionBody from "@/app/batch/[id]/actions/components/action-body"
import {useBatch} from "@/contexts/batch-context"
import {useBatchService} from "@/contexts/batch-service-context"
import {BatchState, Rating} from "@/models/batch"
import SimpleHeader from "@/ui/components/simple-header"
import SmileyButton from "@/ui/components/smiley-button"
import Text from "@/ui/components/text"
import {SmileyVariant} from "@/ui/graphics/smiley"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React, {useState} from "react"
import {TouchableOpacity, View} from "react-native"

const CompleteBatch = () => {
    const router = useRouter()
    const batchService = useBatchService()
    const batch = useBatch()

    const [rating, setRating] = useState<Rating>(undefined)

    const handleComplete = () => {
        console.log(`Completing batch #${batch.id}[${batch.state}]`)

        batch.state = BatchState.Complete
        batch.rating = rating
        batchService.updateBatch(batch)

        // TODO Handle this is a less hacky way?
        router.back()
        router.back()
    }

    return (
        <>
            <SimpleHeader title="Batch complete"/>

            <ActionBody>
                <View className="flex-1 justify-between">
                    <Text className="text-4xl text-brown-800 font-extrabold text-center">
                        How would you rate this batch?
                    </Text>

                    <View className="flex-1 flex-row justify-between items-center p-4">
                        {Object
                            .values(SmileyVariant)
                            .map(v =>
                                <SmileyButton
                                    key={v}
                                    variant={v}
                                    selected={rating === v}
                                    onSelect={setRating}
                                />
                            )
                        }
                    </View>

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
