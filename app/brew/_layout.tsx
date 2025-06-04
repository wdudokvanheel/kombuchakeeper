import {Link, Slot} from "expo-router";
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const BrewLayout = () =>
    <View className="flex-1 mt-4 m-4">
        <SafeAreaView className="flex-1 p-4">
            <Link href="/" className="color-purple-600">Back</Link>
            <Slot/>
        </SafeAreaView>
    </View>

export default BrewLayout;
