import React, {useState, useEffect} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import {Brew} from '@/models/brew'
import {BrewService} from '@/services/brew-service'

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
        <View style={{flex: 1, padding: 16}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{brew.name}</Text>
            <Text>State: {brew.state}</Text>
            <Text>Created At: {brew.createdAt.toDateString()}</Text>
            {brew.firstFermentationEnd && (
                <Text>F1 Ends: {brew.firstFermentationEnd.toDateString()}</Text>
            )}
            {brew.secondFermentationEnd && (
                <Text>F2 Ends: {brew.secondFermentationEnd.toDateString()}</Text>
            )}
            {brew.notes && <Text style={{marginTop: 12}}>{brew.notes}</Text>}
        </View>
    )
}
