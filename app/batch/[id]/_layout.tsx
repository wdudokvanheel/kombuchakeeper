import {Stack} from "expo-router"
import {View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

export default function BatchLayout() {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="flex-1 bg-white"
            style={{
                paddingBottom: Math.max(insets.bottom, 16)
            }}
        >
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="index"
                />
                <Stack.Screen
                    name="batch-action"
                    options={{presentation: 'modal'}}
                />
            </Stack>
        </View>
    )
}