import {useBatch} from "@/contexts/batch-context"
import {BatchState} from "@/models/batch"
import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"

const BatchActionModal = () => {
    const router = useRouter()
    const batch = useBatch()

    const handlePress = (target: string) => router.push(`/batch/${batch.id}/actions/${target}`)
    const handleBack = () => router.back()

    return (
        <View className="flex-col gap-4 p-4">
            <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                <View className="w-12 h-12 rounded-full border border-b-brown-800 justify-center items-center">
                    <Ionicons name="chevron-down" size={20} color={NativeWindColors.brown[800]}/>
                </View>
            </TouchableOpacity>

            <Text className="text-brown-800 mt-4 mb-6 text-4xl font-extrabold">
                Batch actions
            </Text>

            {batch.state === BatchState.F1 && (
                <BatchActionCard
                    title="End fermentation"
                    description="End the first fermentation and start the second phase of fermentation"
                    icon="checkmark"
                    colorCircle={NativeWindColors.green[500]}
                    colorIcon={NativeWindColors.green[100]}
                    onPress={() => handlePress("second-fermentation")}
                />)
            }

            {batch.state === BatchState.F2 && (
                <BatchActionCard
                    title="End fermentation"
                    description="End the second fermentation and mark this batch complete"
                    icon="checkmark"
                    colorCircle={NativeWindColors.green[500]}
                    colorIcon={NativeWindColors.green[100]}
                    onPress={() => handlePress("complete")}
                />)
            }

            <BatchActionCard
                title="Extend fermentation"
                description="Add one or more days to the fermentation timer"
                icon="timer-outline"
                colorCircle={NativeWindColors.orange[400]}
                colorIcon={NativeWindColors.orange[100]}
                onPress={() => handlePress("extend")}
            />

            <BatchActionCard
                title="Mark batch as failed"
                description="Archive this batch as failed in your history"
                icon="close-outline"
                colorCircle={NativeWindColors.purple[500]}
                colorIcon={NativeWindColors.purple[100]}
                onPress={() => handlePress("fail")}
            />
        </View>
    )
}

export default BatchActionModal

type BatchActionCardProps = {
    title: string
    description: string
    icon: string
    colorCircle: string
    colorIcon: string
    onPress: () => void
}

const BatchActionCard = ({title, description, icon, colorCircle, colorIcon, onPress}: BatchActionCardProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className="bg-white flex-row rounded-3xl">
                <View className="w-5/6 gap-2 p-4">
                    <View className="rounded-full p-2 self-start mb-4" style={{backgroundColor: colorCircle}}>
                        <Ionicons name={icon} size={32} color={colorIcon}/>
                    </View>
                    <Text className="font-bold text-2xl text-brown-800">
                        {title}
                    </Text>
                    <Text className="text-xl font-normal">
                        {description}
                    </Text>
                </View>
                <View className="flex-1 justify-center items-end">
                    <Ionicons name="chevron-forward" size={32} color={NativeWindColors.brown[800]}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}
