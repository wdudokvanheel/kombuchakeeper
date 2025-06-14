import {Stack} from "expo-router"
import {useEffect} from "react"
import {Platform, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

const NotesLayout = () => {
    const insets = useSafeAreaInsets()

    useEffect(() => {
        console.info("insets: ", insets)
    }, [insets])

    return (
        <View
            className="flex-1"
            style={{
                paddingTop: Platform.OS === 'android' ? insets.top : 0,
                paddingBottom: Math.max(insets.bottom, 16),
            }}
        >
            <Stack screenOptions={{headerShown: false}}/>
        </View>
    )
}

export default NotesLayout