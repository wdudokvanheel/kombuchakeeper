import ActionBody from "@/app/batch/[id]/actions/components/action-body"
import {useBatch} from "@/contexts/batch-context"
import {useBatchService} from "@/contexts/batch-service-context"
import {BatchState} from "@/models/batch"
import NumberPicker from "@/ui/components/number-picker"
import SimpleHeader from "@/ui/components/simple-header"
import Text from "@/ui/components/text"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"

const ExtendFermentation = () => {
    const router = useRouter()
    const batchService = useBatchService()
    const batch = useBatch()

    const [duration, setDuration] = React.useState(1)

    const handleExtend = () => {
        console.log(`Extending batch #${batch.id}[${batch.state}] by ${duration} days`)

        switch (batch.state) {
            case BatchState.F1: {
                const endDate = batch.firstFermentationEnd || new Date()
                endDate.setDate(endDate.getDate() + duration)
                batch.firstFermentationEnd = endDate
                batchService.updateBatch(batch)
                break
            }
            case "F2": {
                const endDate = batch.secondFermentationEnd || new Date()
                endDate.setDate(endDate.getDate() + duration)
                batch.secondFermentationEnd = endDate
                batchService.updateBatch(batch)
                break
            }
            default:
                break
        }

        // TODO Handle this is a less hacky way?
        router.back()
        router.back()
    }

    return (
        <>
            <SimpleHeader title="Extend fermentation"/>

            <ActionBody>
                <Text className="text-4xl text-brown-800 font-extrabold mb-8 text-center">
                    Extend fermentation by how many days?
                </Text>

                <View className="flex-1 items-center">
                    <NumberPicker
                        start={1}
                        end={10}
                        onChange={setDuration}
                        value={duration}
                        itemHeight={150}
                        width={220}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        onPress={handleExtend}
                        className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                    >
                        <Text className="text-white text-2xl font-semibold">Extend fermentation</Text>
                        <Ionicons name="add" size={28} color="white" className="ml-2"/>
                    </TouchableOpacity>
                </View>
            </ActionBody>
        </>
    )
}
export default ExtendFermentation
