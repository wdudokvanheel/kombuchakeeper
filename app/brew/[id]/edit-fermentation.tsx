import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"

const EditFermentationModal: React.FC = () => {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <View className="flex-col gap-4 p-4">
            <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                <View className="w-12 h-12 rounded-full border border-b-brown-800 justify-center items-center">
                    <Ionicons name="chevron-down" size={20} color={NativeWindColors.brown[800]}/>
                </View>
            </TouchableOpacity>

            <Text className="text-brown-800 mt-8 mb-2 text-4xl font-extrabold">
                Batch actions
            </Text>

            <BrewActionCard
                title="End second fermentation"
                description="Mark this batch complete"
                icon="checkmark"
                colorCircle={NativeWindColors.green[500]}
                colorIcon={NativeWindColors.green[100]}
            />

            <BrewActionCard
                title="Extend fermentation"
                description="Add one or more days to the fermentation timer"
                icon="timer-outline"
                colorCircle={NativeWindColors.orange[400]}
                colorIcon={NativeWindColors.orange[100]}
            />

            <BrewActionCard
                title="Mark brew as failed"
                description="Archive this batch as failed in your history"
                icon="close-outline"
                colorCircle={NativeWindColors.purple[500]}
                colorIcon={NativeWindColors.purple[100]}
            />

        </View>
    )
}

export default EditFermentationModal

type BrewActionCardProps = {
    title: string
    description: string
    icon: string
    colorCircle: string
    colorIcon: string
    target: string
}

const BrewActionCard = ({title, description, icon, colorCircle, colorIcon, target}: BrewActionCardProps) => {
    return (
        <View className="bg-white flex-row rounded-3xl">
            <View className="w-5/6 gap-2 p-4">
                <View className="rounded-full p-2 self-start mb-4" style={{backgroundColor: colorCircle}}>
                    <Ionicons name={icon} size={32} color={colorIcon}/>
                </View>
                <Text className="font-bold text-2xl text-brown-800">
                    {title}
                </Text>
                <Text className="text-xl font-light">
                    {description}
                </Text>
            </View>
            <View className="flex-1 justify-center items-end">
                <Ionicons name="chevron-forward" size={32} color={NativeWindColors.brown[800]}/>
            </View>
        </View>
    )
}