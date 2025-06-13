import AdaptiveProgressCircle from "@/ui/components/adaptive-progress-circle"
import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import MatIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React from "react"
import {View} from "react-native"

interface FermentationPanelProps {
    title: string
    icon: string
    started: boolean
    color: string
    labelColor: string
    start?: Date
    end?: Date
}

const FermentationPanel = ({title, icon, started, color, labelColor, start, end}: FermentationPanelProps) => {
    const msPerDay = 86_400_000

    const today = React.useMemo(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [])

    const startDay = start ? new Date(start.getFullYear(), start.getMonth(), start.getDate()) : undefined
    const endDay = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()) : undefined

    const maxValue = React.useMemo(() => {
        if (startDay && endDay) {
            const diff = endDay.getTime() - startDay.getTime()
            if (diff <= 0) {
                return 0
            }
            return Math.ceil(diff / msPerDay)
        }
        return 0
    }, [startDay, endDay])

    const value = React.useMemo(() => {
        if (!startDay) {
            return 0
        }
        const diff = today.getTime() - startDay.getTime()
        if (diff <= 0) {
            return 0
        }
        const days = Math.floor(diff / msPerDay)
        if (maxValue && days > maxValue) {
            return maxValue
        }
        return days
    }, [startDay, today, maxValue])

    const completed = endDay ? today.getTime() >= endDay.getTime() : false

    let strokeColor = color
    let label = `${value}d`

    if (completed) {
        strokeColor = NativeWindColors.green[500]
    }

    if (!started) {
        label = ""
    } else if (!completed) {
        label = `${maxValue - value}d`
    }

    return (
        <View className={`flex-1 bg-brown-100 rounded-[2rem] {!started ? ' opacity-50' : ''}`}>
            <View className="flex-row px-4 pt-4">
                <Text className="text-brown-800 text-xl font-bold flex-1">{title}</Text>
                <MatIcons name={icon} size={24} color={NativeWindColors.brown[800]}/>
            </View>

            <View className="px-6 pb-6 pt-4">
                <AdaptiveProgressCircle
                    key={`${title}-${value}-${maxValue}`}
                    activeStrokeWidth={32}
                    inActiveStrokeWidth={32}
                    activeStrokeColor={strokeColor}
                    inActiveStrokeColor={NativeWindColors.gray[200]}
                    value={value}
                    maxValue={maxValue}
                    className="aspect-square"
                >
                    <Text className="text-3xl font-semibold text-center text-brown-800">
                        {label}
                    </Text>
                </AdaptiveProgressCircle>
            </View>
        </View>
    )
}

export default FermentationPanel
