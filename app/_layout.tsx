import {Slot} from "expo-router";
import "./tailwind.css"
import {View} from "react-native";

const RootLayout = () => {
    return (
        <>
            <View className="flex-1 bg-brown-100">
                <Slot/>
            </View>
        </>
    )
}

export default RootLayout;
