import {expo} from "@/app.json"
import SimpleHeader from "@/ui/components/simple-header"
import Text from "@/ui/components/text"
import {Image} from "expo-image"
import React from "react"
import {Linking, Platform, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

const About = () => {
    const insets = useSafeAreaInsets()

    return (
        <><View
            className="flex-1"
            style={[{
                paddingBottom: Math.max(insets.bottom, 16),
            }]}
        >
            <SimpleHeader title="About"/>
            <View className="p-4 flex-col flex-1 justify-between">
                <View className="h-1/2">
                    <Image
                        contentPosition={"center"}
                        contentFit={"contain"}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        className="bg-white"
                        source={require('@/assets/images/fail.png')}
                    />
                </View>

                <InfoPanel/>
            </View>
        </View>
        </>
    )
}
export default About

const InfoPanel = () => {
    const appVersion = expo.version ?? "1.0.0"
    const platformPrefix = Platform.OS === "ios" ? "iOS" : "Android"

    const URL_LICENSE = "https://wdudokvanheel.github.io/kombuchakeeper/license.html"
    const URL_PRIVACY = "https://wdudokvanheel.github.io/kombuchakeeper/privacy.html"
    const URL_SOURCE = `https://github.com/wdudokvanheel/kombuchakeeper/tree/${platformPrefix.toLowerCase()}-v${appVersion}`

    return (
        <View className="p-4 bg-white rounded-[2rem]">
            <Text className="text-3xl font-semibold text-gray-900">
                Kombucha Keeper
            </Text>
            <Text className="text-lg text-gray-800">
                {platformPrefix} client
                v{appVersion}
            </Text>

            <Text
                className="text-xl font-semibold text-gray-800 mt-2"
                onPress={() => Linking.openURL(URL_SOURCE)}
            >
                Source code
            </Text>
            <Text
                className="text-xl font-semibold text-gray-800"
                onPress={() => Linking.openURL(URL_LICENSE)}
            >
                License
            </Text>
            <Text
                className="text-xl font-semibold text-gray-800"
                onPress={() => Linking.openURL(URL_PRIVACY)}
            >
                Privacy policy
            </Text>
        </View>
    )
}