import {Slot} from "expo-router"
import React from "react"
import {View} from "react-native"
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const SettingsLayout = () => {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="flex-1 bg-brown-100"
            style={[{
                paddingBottom: Math.max(insets.bottom, 16),
            }]}
        >
            <Slot/>
        </View>
    )
}

export default SettingsLayout
