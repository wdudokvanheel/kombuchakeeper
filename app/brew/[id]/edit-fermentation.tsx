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
                <View
                    className="w-12 h-12 rounded-full border border-b-brown-800 justify-center items-center"
                >
                    <Ionicons name="chevron-down" size={20} color={NativeWindColors.brown[800]}/>
                </View>
            </TouchableOpacity>

            <Text className="text-brown-800 mt-8 mb-2 text-4xl font-extrabold">
                Brew actions
            </Text>

            <View className="bg-white flex-row rounded-3xl">
                <View className="w-5/6 gap-2 p-4">
                    <View className="rounded-full bg-green-500 p-2 self-start mb-4">
                        <Ionicons name="checkmark" size={32} color={NativeWindColors.green[100]}/>
                    </View>

                    <Text className="font-bold text-2xl text-brown-800">
                        End fermentation
                    </Text>

                    <Text className="text-xl font-light">
                        Lorem ipsum lorem ipsum loremipsum loremipsum loremipsum lorem
                    </Text>
                </View>

                <View className="flex-1 justify-center items-end">
                    <Ionicons name="chevron-forward" size={32} color={NativeWindColors.brown[800]}/>
                </View>
            </View>

            <View className="bg-white flex-row rounded-3xl ">
                <View className="w-5/6 gap-2 p-4">
                    <View className="rounded-full bg-orange-400 p-2 self-start mb-4">
                        <Ionicons name="timer-outline" size={32} color={NativeWindColors.green[100]}/>
                    </View>

                    <Text className="font-bold text-2xl text-brown-800">
                        Extend fermentation
                    </Text>

                    <Text className="text-xl font-light">
                        Lorem ipsum lorem ipsum loremipsum loremipsum loremipsum lorem
                    </Text>
                </View>

                <View className="flex-1 justify-center items-end">
                    <Ionicons name="chevron-forward" size={32} color={NativeWindColors.brown[800]}/>
                </View>
            </View>

            <View className="bg-white flex-row rounded-3xl ">
                <View className="w-5/6 gap-2 p-4">
                    <View className="rounded-full bg-purple-500 p-2 self-start mb-4">
                        <Ionicons name="trash" size={32} color={NativeWindColors.green[100]}/>
                    </View>

                    <Text className="font-bold text-2xl text-brown-800">
                        Delete this brew
                    </Text>

                    <Text className="text-xl font-light">
                        Lorem ipsum lorem ipsum loremipsum loremipsum loremipsum lorem
                    </Text>
                </View>

                <View className="flex-1 justify-center items-end">
                    <Ionicons name="chevron-forward" size={32} color={NativeWindColors.brown[800]}/>
                </View>
            </View>
        </View>
    )
}

export default EditFermentationModal