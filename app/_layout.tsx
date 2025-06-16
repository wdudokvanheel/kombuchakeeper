import {BatchServiceProvider} from "@/contexts/batch-service-context"
import {MenuBarProvider} from "@/contexts/menubar-context"
import {MockBatchService} from "@/services/batch-service"
import {queryClient} from '@/services/query-client'
import useUrbanistFont from "@/ui/font"
import {QueryClientProvider} from '@tanstack/react-query'
import {Stack} from "expo-router"
import {Platform, View} from "react-native"
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context'

import "./tailwind.css"

const RootLayout = () => {
    let batchService = new MockBatchService()

    if (!useUrbanistFont()) {
        return null
    }

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <QueryClientProvider client={queryClient}>
                <BatchServiceProvider service={batchService}>
                    <MenuBarProvider>
                        <View className="flex-1 bg-brown-100">
                            <Stack screenOptions={{
                                headerShown: false,
                                animation: 'slide_from_right',
                            }}
                            >
                                <Stack.Screen name="(main)"/>

                                <Stack.Screen
                                    name="batch/[id]"
                                    options={{
                                        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
                                        animationDuration: 350,
                                    }}
                                />

                                <Stack.Screen
                                    name="batch/new"
                                    options={{
                                        animation: 'slide_from_bottom',
                                        animationDuration: 350
                                    }}
                                />

                                <Stack.Screen
                                    name="settings"
                                />
                            </Stack>
                        </View>
                    </MenuBarProvider>
                </BatchServiceProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}

export default RootLayout
