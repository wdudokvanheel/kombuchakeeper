import {expo} from "@/app.json"
import SimpleHeader from "@/ui/components/simple-header"
import Text from "@/ui/components/text"
import JarGraphic from "@/ui/graphics/logo-graphic"
import React from "react"
import {Linking, Platform, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

const About = () => {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="flex-1"
            style={{
                paddingBottom: Math.max(insets.bottom, 16),
                paddingTop: Platform.OS === 'android' ? insets.top : 0
            }}
        >
            <SimpleHeader title="About"/>

            <View className="flex-1 px-4 pb-4">
                <View className="flex-1  items-center justify-center">
                    <JarGraphic/>
                </View>

                <InfoPanel className="mt-6"/>
            </View>
        </View>
    )
}
export default About

type InfoProps = { className?: string }

const InfoPanel = ({className}: InfoProps) => {
    const appVersion = expo.version ?? "1.0.0"
    const platformPrefix = Platform.OS === "ios" ? "iOS" : "Android"

    const URL_LICENSE = "https://wdudokvanheel.github.io/kombuchakeeper/license.html"
    const URL_PRIVACY = "https://wdudokvanheel.github.io/kombuchakeeper/privacy.html"
    const URL_SOURCE = `https://github.com/wdudokvanheel/kombuchakeeper/tree/${platformPrefix.toLowerCase()}-v${appVersion}`

    return (
        <View className={`p-4 bg-white rounded-[2rem] ${className ?? ""}`}>
            <Text className="text-3xl font-semibold text-gray-900">
                Kombucha Keeper
            </Text>
            <Text className="text-lg text-gray-800">
                {platformPrefix} client · v{appVersion}
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
