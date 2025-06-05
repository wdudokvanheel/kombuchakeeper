import {Slot} from "expo-router";
import {View} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BrewLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1" style={[{
            paddingBottom: insets.bottom,
        }]}>
            <Slot/>
        </View>
    )
}

export default BrewLayout;
