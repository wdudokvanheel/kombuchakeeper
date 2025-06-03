import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Text, View} from 'react-native'
import {Link, useLocalSearchParams} from 'expo-router'
import {Brew} from '@/models/brew'
import {BrewService} from '@/services/brew-service'
import {SafeAreaView} from "react-native-safe-area-context";

export default function BrewDetail() {
    const {id} = useLocalSearchParams();

    const [brew, setBrew] = useState<Brew | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            if (!id) return
            const result = await BrewService.getBrewById(Number(id))
            setBrew(result)
            setLoading(false)
        }
        load()
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
            <Text className="text-3xl font-semibold text-center">{brew.name}</Text>
            <Text>State: {brew.state}</Text>
            <Text>Created At: {brew.createdAt.toDateString()}</Text>
            {brew.firstFermentationEnd && (
                <Text>F1 Ends: {brew.firstFermentationEnd.toDateString()}</Text>
            )}
            {brew.secondFermentationEnd && (
                <Text>F2 Ends: {brew.secondFermentationEnd.toDateString()}</Text>
            )}
            {brew.notes && <Text>{brew.notes}</Text>}
        </>
    )
}
