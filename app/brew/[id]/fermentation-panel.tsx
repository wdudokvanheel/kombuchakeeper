import AdaptiveProgressCircle from "@/ui/components/adaptive-progress-circle"
import {NativeWindColors} from "@/ui/nativewind"
import React from "react"
import {Text, View} from "react-native"

interface FermentationPanelProps {
    title: string
    started: boolean
    color: string
    labelColor: string
    start?: Date
    end?: Date
}

const FermentationPanel: React.FC<FermentationPanelProps> = ({title, started, color, labelColor, start, end}) => {
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

    const completed = today.getTime() >= endDay?.getTime()

    let strokeColor = color

    if (completed) {
        strokeColor = NativeWindColors.green[500]
    }

    let label = `${value}d`
    let computedLabelColor = labelColor

    if (!completed) {
        label = `${maxValue - value}d`
    } else {
        computedLabelColor = NativeWindColors.green[700]
    }

    if (!started) {
        label = ""
        computedLabelColor = NativeWindColors.gray[700]
    }

    return (
        <View className={`flex-1 bg-brown-100 rounded-[2rem] p-4${!started ? ' opacity-50' : ''}`}>
            <Text className="text-brown-900 text-lg font-bold">{title}</Text>

            <View className="p-6">
                <AdaptiveProgressCircle
                    activeStrokeWidth={24}
                    inActiveStrokeWidth={24}
                    activeStrokeColor={strokeColor}
                    inActiveStrokeColor={NativeWindColors.gray[200]}
                    value={value}
                    maxValue={maxValue}
                    className="aspect-square"
                >
                    <Text className="text-2xl font-medium text-center" style={{color: computedLabelColor}}
                          numberOfLines={2}>{label}</Text>
                </AdaptiveProgressCircle>
            </View>
        </View>
    )
}

export default FermentationPanel
