import MenuBar from "@/app/(main)/menubar"
import Text from "@/ui/components/text";
import ThemedHeader from "@/ui/components/themed-header"
import {NativeWindColors} from "@/ui/nativewind";
import {Slot, useRouter} from "expo-router";
import React from "react";
import {View} from "react-native";

const MainLayout = () => {
    const router = useRouter()

    return (
        <>
            <ThemedHeader background={NativeWindColors.brown[800]} useSafeArea={true}>
                <Text className="text-brown-100 text-3xl text-center p-0 mb-4 uppercase">
                    Kombucha Keeper
                </Text>
            </ThemedHeader>

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
