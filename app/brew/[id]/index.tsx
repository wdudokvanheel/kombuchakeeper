import FermentationPanel from "@/app/brew/[id]/fermentation-panel"
import {Brew} from '@/models/brew'
import {BrewService} from '@/services/brew-service'
import {BrewStateColor, BrewStateLabelColor} from "@/ui/brewstate-color";
import {NativeWindColors} from '@/ui/nativewind'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useLocalSearchParams, useRouter} from 'expo-router'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context"
import Svg, {Path} from 'react-native-svg'

const BrewDetail: React.FC = () => {
    const {id} = useLocalSearchParams()

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

    const background = BrewStateColor[brew.state] ?? NativeWindColors.gray[200]
    const foreground = BrewStateLabelColor[brew.state] ?? NativeWindColors.gray[900]

    return (
        <>
            <BrewDetailHeader title={brew.name} background={background} foreground={foreground}>
                <View className="mb-12 mt-0">
                    <Text
                        className="text-center text-9xl font-bold"
                        style={{color: foreground}}
                    >
                        {brew.getDaysLeft()}
                    </Text>
                    <Text
                        className="text-center  text-lg -mt-4"
                        style={{color: foreground}}
                    >
                        days remaining
                    </Text>
                </View>
            </BrewDetailHeader>

            <View className="flex-1 px-4">
                <Text className="my-4 font-semibold text-brown-800">Fermentation</Text>
                <View className="flex-row gap-8">
                    <FermentationPanel
                        title="First"
                        icon="bottle-tonic"
                        color={NativeWindColors.yellow[400]}
                        labelColor={NativeWindColors.brown[800]}
                        start={brew.createdAt}
                        started={true}
                        end={brew.firstFermentationEnd}
                    />

                    <FermentationPanel
                        title="Second"
                        icon="bottle-soda-classic"
                        color={NativeWindColors.orange[400]}
                        labelColor={NativeWindColors.brown[800]}
                        start={brew.firstFermentationEnd}
                        started={brew.hasFirstFermentationEnded()}
                        end={brew.secondFermentationEnd}
                    />
                </View>
            </View>
        </>
    )
}

export default BrewDetail

interface BrewDetailHeaderProps {
    title: string
    background: string
    foreground: string
    children?: React.ReactNode
}

const BrewDetailHeader: React.FC<BrewDetailHeaderProps> = ({title, background, foreground, children}) => {
    const insets = useSafeAreaInsets()
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <View style={{paddingTop: insets.top, backgroundColor: background}} className="relative">
                <View className="px-4">
                    <View className="flex-row items-center mt-4 mb-8">
                        <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                            <View
                                className="w-12 h-12 rounded-full border border justify-center items-center"
                                style={{borderColor: foreground}}
                            >
                                <Ionicons name="chevron-back" size={20} color={foreground}/>
                            </View>
                        </TouchableOpacity>
                        <Text
                            className=" text-2xl font- ml-4"
                            style={{color: foreground}}
                        >
                            {title}
                        </Text>
                    </View>

                    {children}
                </View>
            </View>
            <Svg width="100%" height={40} viewBox="0 0 100 100" preserveAspectRatio="none">
                <Path d="M0 0 H100 V100 Q50 -100 0 100 Z" fill={background}/>
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
    )
}
