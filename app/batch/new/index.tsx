import {useBatchService} from "@/contexts/batch-service-context"
import {Preference, usePreference} from "@/contexts/preference-context"
import {Batch} from "@/models/batch"
import NumberPicker from "@/ui/components/number-picker"
import Text from "@/ui/components/text"
import ThemedTextInput from "@/ui/components/themed-textinput"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React, {useState} from "react"
import {TouchableOpacity, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

const NewBatch = () => {
    const [name, setName] = useState("")
    const router = useRouter()
    const batchService = useBatchService()
    const [defaultDuration] = usePreference<number>(Preference.F1)

    const [duration, setDuration] = React.useState(defaultDuration)

    const saveBatch = () => {
        const parsedDays = duration
        const firstFermentationEnd = new Date()
        firstFermentationEnd.setDate(firstFermentationEnd.getDate() + parsedDays)

        let batch = new Batch({
            name: name,
            firstFermentationEnd: firstFermentationEnd
        })

        batchService.addBatch(batch).then(() => router.push("/"))
    }

    return (
        <>
            <NewBatchHeader/>

            <View className="flex-1 justify-between px-4 pt-4">
                <View className="flex-1">
                    <Text className="text-xl font-semibold text-brown-900 mb-2">
                        Batch name
                    </Text>

                    <ThemedTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Unnamed batch"
                    />

                    <Text className="text-xl font-semibold text-brown-900 mb-2">
                        First fermentation duration in days
                    </Text>

                    <View className="w-full items-center">
                        <NumberPicker start={1} end={30} value={duration} onChange={setDuration}/>
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={saveBatch}
                        className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                    >
                        <Text className="text-white text-2xl font-semibold">Add batch</Text>
                        <Ionicons name="add" size={28} color="white" className="ml-2"/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default NewBatch

const NewBatchHeader = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <View
            className="bg-green-500 overflow-hidden w-full z-50"
            style={{
                paddingTop: insets.top,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
            }}
        >
            {/* Decorative circles */}
            <View className="absolute inset-0 pointer-events-none">
                <View className="absolute -top-[140px] -right-[50px] w-56 h-56 rounded-full bg-white/15"/>
                <View className="absolute top-20 right-16 w-20 h-20 rounded-full bg-white/15"/>
                <View className="absolute bottom-0 -right-[100px] w-40 h-40 rounded-full bg-white/15"/>
            </View>

            <View className="px-4 pb-8">
                <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                    <View className="w-12 h-12 rounded-full border border-white justify-center items-center mt-4 mb-8">
                        <Ionicons name="chevron-down" size={20} color="white"/>
                    </View>
                </TouchableOpacity>

                <Text className="text-5xl font-bold text-brown-100">Start new batch</Text>
            </View>
        </View>
    )
}

