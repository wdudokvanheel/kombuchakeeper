import ActionBody from "@/app/batch/[id]/actions/components/action-body"
import {useBatch} from "@/contexts/batch-context"
import {useBatchService} from "@/contexts/batch-service-context"
import {BatchState} from "@/models/batch"
import SimpleHeader from "@/ui/components/simple-header"
import Text from "@/ui/components/text"
import {SmileyVariant} from "@/ui/graphics/smiley"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {Image} from "expo-image"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"

const FailBatch = () => {
    const router = useRouter()
    const batchService = useBatchService()
    const batch = useBatch()

    const handleFail = () => {
        console.log(`Failing batch #${batch.id}[${batch.state}]`)

        batch.state = BatchState.Failed
        batch.rating = SmileyVariant.SuperSad
        batchService.updateBatch(batch)

        // TODO Handle this is a less hacky way?
        router.back()
        router.back()
    }

    return (
        <>
            <SimpleHeader title="Batch failed"/>

            <ActionBody>
                <View className="flex-1">
                    <View className="flex-1 px-8 ">
                        <Image
                            contentPosition={"center"}
                            contentFit={"contain"}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={require('@/assets/images/fail.png')}
                        />
                    </View>

                    <View className="mb-8 bg-white rounded-[2rem] p-4 flex-row items-center">
                        <Ionicons name="information-circle" className="mr-4" size={48} color={NativeWindColors.purple[600]}/>
                        <Text className="flex-1 text-brown-900 text-lg font-medium">
                            You can mark your batch as failed it has mold, is contaminated, or something else happened that prevents you from completing this batch.
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={handleFail}
                            className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                        >
                            <Text className="text-white text-2xl font-semibold">Fail batch</Text>
                            <Ionicons name="arrow-forward" size={28} color="white" className="ml-2"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionBody>
        </>
    )
}

export default FailBatch
