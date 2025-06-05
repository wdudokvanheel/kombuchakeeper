import {Link} from "expo-router";
import React from "react";
import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const NewBrewHeader: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="bg-green-500 overflow-hidden w-full z-50"
            style={{
                paddingTop: insets.top,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
            }}
        >
            {/* Decorative circles */}
            <View className="absolute inset-0 pointer-events-none">
                <View className="absolute -top-[140px] -right-[50px] w-56 h-56 rounded-full bg-white/15"/>
                <View className="absolute top-20 right-16 w-20 h-20 rounded-full bg-white/15"/>
                <View className="absolute bottom-0 -right-[100px] w-40 h-40 rounded-full bg-white/15"/>
            </View>

            <View className="px-8 pb-8">
                <Link href="/" className="text-brown-100 mt-8 mb-8">
                    Back
                </Link>
                <Text className="text-5xl font-bold text-brown-100">Start new brew</Text>
            </View>
        </View>
    );
};

export default NewBrewHeader;
