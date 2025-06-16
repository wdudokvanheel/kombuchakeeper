import {expo} from "@/app.json"
import Text from "@/ui/components/text"
import React from "react"
import {Linking, Platform, View} from "react-native"

const AboutPanel = () => {
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
                Privacy Policy
            </Text>
        </View>
    )
}

export default AboutPanel
