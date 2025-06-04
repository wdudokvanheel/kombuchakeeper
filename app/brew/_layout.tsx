import {Link, Slot} from "expo-router";
import {View} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BrewLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 px-4" style={[
            {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }]}
        >
            <Link href="/" className="color-purple-600 mb-4">Back</Link>
            <Slot/>
        </View>
    )
}

export default BrewLayout;
