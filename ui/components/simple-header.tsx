import Text from "@/ui/components/text";
import {NativeWindColors} from "@/ui/nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useRouter} from "expo-router";
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SimpleHeaderProps = {
    title: string
    useSafeArea?: boolean
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({title, useSafeArea = false}: HeaderProps) => {
    const insets = useSafeAreaInsets()
    const router = useRouter()

    const handleBack = () => router.back()

    return (
        <View className="px-4 pb-4 m-0 rounded-b-[40px] overflow-hidden w-full z-50"
              style={{
                  paddingTop: useSafeArea ? insets.top : 16,
              }}
        >
            <TouchableOpacity activeOpacity={0.8} onPress={handleBack} className="mb-8">
                <View className="flex-row items-center">
                    <View
                        className="w-12 h-12 rounded-full border border-brown-800 justify-center items-center"
                    >
                        <Ionicons name="chevron-back" size={20} color={NativeWindColors.brown[800]}/>
                    </View>

                    <Text className="flex-1 ml-4 text-2xl font-medium text-brown-800">
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SimpleHeader
