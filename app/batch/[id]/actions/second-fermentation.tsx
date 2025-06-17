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

const SecondFermentation = () => {
    const router = useRouter()
    const batch = useBatch()
    const batchService = useBatchService()

    const [duration, setDuration] = React.useState(1)

    const handleStartNextFermentation = () => {
        console.log(`Starting F2 on batch #${batch.id}[${batch.state}] with a duration of ${duration} days`)

        if (batch.state !== BatchState.F1) {
            return
        }

        const endDate = new Date()
        endDate.setDate(endDate.getDate() + duration)

        batch.state = BatchState.F2
        batch.firstFermentationEnd = new Date()
        batch.secondFermentationEnd = endDate

        batchService.updateBatch(batch)

        // TODO Handle this is a less hacky way?
        router.back()
        router.back()
    }

    return (
        <>
            <SimpleHeader title="End first fermentation"/>

            <ActionBody>
                <Text className="text-4xl text-brown-800 font-extrabold mb-8 text-center">
                    How long will the second fermentation last?
                </Text>

                <NumberPicker start={1} end={10} onChange={setDuration} value={duration} itemHeight={150} width={220}/>

                <View>
                    <TouchableOpacity
                        onPress={handleStartNextFermentation}
                        className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                    >
                        <Text className="text-white text-2xl font-semibold">Start second fermentation</Text>
                        <Ionicons name="arrow-forward" size={28} color="white" className="ml-2"/>
                    </TouchableOpacity>
                </View>
            </ActionBody>
        </>
    )
}
export default SecondFermentation
