import NumberSetting from "@/app/settings/components/number-setting"
import {Preference, usePreference} from "@/contexts/preference-context"
import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {useRouter} from "expo-router"
import React from "react"
import {TouchableOpacity, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

const Settings = () => {
    const router = useRouter()

    const [f1Duration, setF1Duration] = usePreference<number>(Preference.F1)
    const [f2Duration, setF2Duration] = usePreference<number>(Preference.F2)
    const [hour, setHour] = usePreference<number>(Preference.NotificationTime)

    const handleAbout = () => {
        router.push("/settings/about")
    }
    return (
        <>
            <SettingsHeader/>

            <View className="justify-between flex-1 p-4">
                <View className="flex-col gap-4">
                    <NumberSetting
                        title="First fermentation"
                        description="The default duration of the first fermentation, this can still be adjusted for each new batch"
                        value={f1Duration}
                        onChange={setF1Duration}
                        min={1}
                        max={30}
                        color={NativeWindColors.yellow[500]}
                        textColor={NativeWindColors.yellow[900]}
                    />

                    <NumberSetting
                        title="Second fermentation"
                        description="The default duration of the second fermentation, this can still be adjusted when a batch has completed its first fermentation"
                        value={f2Duration}
                        onChange={setF2Duration}
                        min={1}
                        max={30}
                        color={NativeWindColors.orange[400]}
                        textColor={NativeWindColors.orange[900]}
                    />

                    <NumberSetting
                        title="Notification time"
                        description="At what hour of the day would you like to be reminded that a batch has finished fermenting (0-23)"
                        value={hour}
                        onChange={setHour}
                        min={0}
                        max={23}
                        color={NativeWindColors.brown[500]}
                        textColor={NativeWindColors.brown[900]}
                    />
                </View>

                <View className="items-center">
                    <TouchableOpacity activeOpacity={0.75} onPress={handleAbout}>
                        <View className="flex-row">
                            <Ionicons name="information-circle" size={24} color={NativeWindColors.purple[600]}/>
                            <Text className="text-purple-600 text-xl font-semibold self-center ml-1">About</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Settings

const SettingsHeader = () => {
    const insets = useSafeAreaInsets()
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <View
            className="bg-gray-700 overflow-hidden w-full z-50"
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
                        <Ionicons name="chevron-back" size={20} color="white"/>
                    </View>
                </TouchableOpacity>

                <Text className="text-5xl font-bold text-brown-100">Settings</Text>
            </View>
        </View>
    )
}


