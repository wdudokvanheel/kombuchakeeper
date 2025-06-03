import {Slot} from "expo-router";
import "./tailwind.css"
import {View} from "react-native";
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context'

const RootLayout = () => {
    return (
        <>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <View className="flex-1 bg-brown-100">
                    <Slot/>
                </View>
            </SafeAreaProvider>
        </>
    )
}

export default RootLayout;
