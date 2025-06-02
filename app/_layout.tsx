import {Slot, useRouter} from "expo-router";
import "./tailwind.css"
import {View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuBar from "@/app/menubar"

const RootLayout = () => {
    const router = useRouter()

    return (
        <>
            <SafeAreaView className="flex-1 bg-gray-100">
                <View className="flex-1 ps-4 pe-4 pb-4">
                    <Slot/>
                </View>
                <View className="ms-4 me-4">
                    <MenuBar
                        height={70}
                        dipWidth={160}
                        onPress={() => router.push("/brew/new")}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default RootLayout;
