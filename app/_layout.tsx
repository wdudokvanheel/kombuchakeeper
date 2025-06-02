import {Slot, useRouter} from "expo-router";
import "./tailwind.css"
import {View} from "react-native";
import MenuBar from "@/app/menubar"
import AppHeader from "@/app/header"

const RootLayout = () => {
    const router = useRouter()

    return (
        <>
            <View className="flex-1 bg-brown-100">
                <AppHeader radius={50}/>

                <View className="flex-1 mt-4">
                    <Slot/>
                </View>
                <View className="mx-0">
                    <MenuBar
                        height={85}
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
