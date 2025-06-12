import {Slot} from "expo-router";
import {View} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BatchLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="flex-1"
            style={[{
                paddingBottom: Math.max(insets.bottom, 16),
            }]}
        >
            <Slot/>
        </View>
    )
}

export default BatchLayout;
