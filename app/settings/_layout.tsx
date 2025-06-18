import {Stack} from "expo-router"
import React from "react"
import {View} from "react-native"
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const SettingsLayout = () => {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="flex-1"
            style={[{
                paddingBottom: Math.max(insets.bottom, 16),
            }]}
        >
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="index"
                />
                <Stack.Screen
                    name="about"
                    options={{presentation: 'modal'}}
                />
            </Stack>
        </View>
    )
}

export default SettingsLayout
