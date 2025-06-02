import {Slot, useRouter} from "expo-router";
import "./tailwind.css"
import {View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuBar from "@/app/menubar"

const RootLayout = () => {
    const router = useRouter()

    return (
        <>
            <View className="flex-1 bg-brown-100">
                <SafeAreaView className="flex-1">
                    <View className="flex-1">
                        <Slot/>
                    </View>
                </SafeAreaView>
                <View className="mx-0">
                    <MenuBar
                        height={95}
                        dipWidth={160}
                        cornerRadius={80}
                        onPress={() => router.push("/brew/new")}
                    />
                </View>
            </View>
        </>
    )
}

export default RootLayout;
