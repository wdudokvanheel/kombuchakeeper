import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"

const CompleteBatch = () => {
    const router = useRouter()
    const handleBack = () => router.back()

    return (
        <View className="flex-col gap-4 p-4">
            <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                <View className="w-12 h-12 rounded-full border border-b-brown-800 justify-center items-center">
                    <Ionicons name="chevron-back" size={20} color={NativeWindColors.brown[800]}/>
                </View>
            </TouchableOpacity>

            <Text className="text-brown-800 mt-8 mb-2 text-4xl font-extrabold">
                Complete batch
            </Text>
        </View>
    )
}
export default CompleteBatch
