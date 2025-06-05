import {Brew} from '@/models/brew'
import {BrewService} from '@/services/brew-service'
import Ionicons from "@expo/vector-icons/Ionicons";
import {Link, useLocalSearchParams} from 'expo-router'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";

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
            <BrewDetailHeader/>

            <View className="flex-1 px-4">
                <Text className="text-5xl font-bold text-brown-900">{brew.name}</Text>

                <Text>State: {brew.state}</Text>
                <Text>Created At: {brew.createdAt.toDateString()}</Text>
                {brew.firstFermentationEnd && (
                    <Text>F1 Ends: {brew.firstFermentationEnd.toDateString()}</Text>
                )}
                {brew.secondFermentationEnd && (
                    <Text>F2 Ends: {brew.secondFermentationEnd.toDateString()}</Text>
                )}
                {brew.notes && <Text>{brew.notes}</Text>}
            </View>
        </>
    )
}

export default BrewDetail

const BrewDetailHeader: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="px-4 "
              style={{
                  paddingTop: insets.top,
              }}
        >
            <View className="flex-row items-center p-0 mt-4 mb-10">
                <TouchableOpacity activeOpacity={0.8}>
                    <Link href="/">
                        <View className="w-12 h-12 rounded-full border border-brown-900 justify-center items-center">
                            <Ionicons name="chevron-back" size={20} color="brown-500"/>
                        </View>
                    </Link>
                </TouchableOpacity>
                <Text className="text-brown-900 text-xl font-semibold ml-4">Brew details</Text>
            </View>

        </View>
    )
}
