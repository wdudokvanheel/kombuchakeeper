import AppHeader from "@/app/(main)/header"
import MenuBar from "@/app/(main)/menubar"
import {Slot, useRouter} from "expo-router";
import {View} from "react-native";

const MainLayout = () => {
    const router = useRouter()

    return (
        <>
            <AppHeader radius={50}/>

            <View className="flex-1">
                <Slot/>
            </View>

            <View className="mx-0">
                <MenuBar
                    height={100}
                    dipWidth={160}
                    cornerRadius={80}
                    onPress={() => router.push("/batch/new")}
                />
            </View>
        </>
    )
}

export default MainLayout;
