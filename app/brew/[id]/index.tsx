import {Brew} from '@/models/brew'
import {BrewService} from '@/services/brew-service'
import AdaptiveProgressCircle from '@/ui/components/adaptive-progress-circle';
import {NativeWindColors} from '@/ui/nativewind';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Link, useLocalSearchParams} from 'expo-router'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Svg, {Path} from 'react-native-svg';

const BrewDetail: React.FC = () => {
    const {id} = useLocalSearchParams();

    const [brew, setBrew] = useState<Brew | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }

        BrewService
            .getBrewById(Number(id))
            .then(brew => {
                setBrew(brew)
                setLoading(false)
            })

    }, [id])

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }

    if (!brew) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Brewing batch not found.</Text>
            </View>
        )
    }

    return (
        <>
            <BrewDetailHeader title={brew.name}/>

            <View className="flex-1 px-8 ">
                <Text className="my-4 font-semibold text-brown-900">Brew details</Text>
                <View className="flex-row gap-8">
                    <View className="flex-1 bg-brown-100 rounded-[2rem] p-4">

                        <Text className="text-brown-900 text-lg font-bold">First</Text>

                        <View className="p-6">
                            <AdaptiveProgressCircle
                                activeStrokeWidth={24}
                                inActiveStrokeWidth={24}
                                activeStrokeColor={NativeWindColors.yellow[500]}
                                inActiveStrokeColor={NativeWindColors.gray[200]}
                                value={3}
                                maxValue={5}
                                className="aspect-square"
                            >
                                <Text className="text-xl font-semibold">5d</Text>
                            </AdaptiveProgressCircle>
                        </View>
                    </View>

                    <View className="flex-1 bg-brown-100 rounded-[2rem] p-4 opacity-50">
                        <Text className="text-brown-900 text-lg font-bold">Second</Text>
                        <View className="p-6">
                            <AdaptiveProgressCircle
                                activeStrokeWidth={24}
                                inActiveStrokeWidth={24}
                                activeStrokeColor={NativeWindColors.orange[500]}
                                inActiveStrokeColor={NativeWindColors.gray[200]}
                                value={0}
                                maxValue={5}
                                className="aspect-square"
                            >
                                <Text className="text-xl font-semibold"></Text>
                            </AdaptiveProgressCircle>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default BrewDetail

interface BrewDetailHeaderProps {
    title: string;
}

const BrewDetailHeader: React.FC<BrewDetailHeaderProps> = ({title}) => {
    const insets = useSafeAreaInsets();

    return (
        <>
            <View style={{paddingTop: insets.top}} className="relative bg-orange-400">
                <View className="px-4 ">
                    <View className="flex-row items-center mt-4 mb-8">
                        <TouchableOpacity activeOpacity={0.8}>
                            <Link href="/">
                                <View
                                    className="w-12 h-12 rounded-full border border-brown-100 justify-center items-center">
                                    <Ionicons name="chevron-back" size={20} color={NativeWindColors.brown[100]}/>
                                </View>
                            </Link>
                        </TouchableOpacity>
                        <Text className="text-brown-100 text-xl font-semibold ml-4">{title}</Text>
                    </View>

                    <View className="mb-12 mt-0">
                        <Text className="text-center text-9xl font-bold text-brown-100">5</Text>
                        <Text className="text-center text-white text-lg -mt-4">days remaining</Text>
                    </View>
                </View>
            </View>
            <Svg width="100%" height={48} viewBox="0 0 100 100" preserveAspectRatio="none">
                <Path d="M0 0 H100 V100 Q50 -100 0 100 Z" fill={NativeWindColors.orange[400]}/>
            </Svg>

            {/* Decorative circles */}
            <View className="absolute inset-0 pointer-events-none">
                <View className="absolute -top-[140px] -right-[50px] w-56 h-56 rounded-full bg-white/15"/>
                <View className="absolute top-24 right-16 w-20 h-20 rounded-full bg-white/15"/>
                <View className="absolute top-[160px] right-[-60px] w-40 h-40 rounded-full bg-white/15"/>
                <View className="absolute top-[180px] left-[-40px] w-20 h-20 rounded-full bg-white/15"/>
                <View className="absolute top-[140px] left-[75px] w-10 h-10 rounded-full bg-white/15"/>
            </View>

        </>
    );
};
