import {Slot} from "expo-router";
import "./tailwind.css"
import {View} from "react-native";
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context'
import {QueryClientProvider} from '@tanstack/react-query'
import {queryClient} from '@/services/query-client'

const RootLayout = () =>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>

            <View className="flex-1 bg-brown-100">
                <Slot/>
            </View>

        </QueryClientProvider>
    </SafeAreaProvider>

export default RootLayout;
