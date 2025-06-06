import {queryClient} from '@/services/query-client'
import {QueryClientProvider} from '@tanstack/react-query'
import {Slot, Stack} from "expo-router";
import {View} from "react-native";
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context'

import "./tailwind.css"

const RootLayout = () =>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>

            <View className="flex-1 bg-brown-100">
                <Stack screenOptions={{headerShown: false}}/>
            </View>

        </QueryClientProvider>
    </SafeAreaProvider>

export default RootLayout;
