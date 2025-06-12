import MenuBar from "@/app/(main)/menubar"
import Header from "@/ui/components/header"
import Text from "@/ui/components/text";
import {NativeWindColors} from "@/ui/nativewind";
import {Slot, useRouter} from "expo-router";
import React from "react";
import {View} from "react-native";

const MainLayout = () => {
    const router = useRouter()

    return (
        <>
            <Header background={NativeWindColors.brown[800]}>
                <Text className="text-brown-100 text-3xl text-center p-0 mb-4 uppercase">
                    Kombucha Keeper
                </Text>
            </Header>

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
