import React, {useState} from 'react'
import {LayoutChangeEvent, View, ViewStyle} from 'react-native'
import {CircularProgressBase} from 'react-native-circular-progress-indicator'

type AdaptiveProgressCircle = Omit<React.ComponentProps<typeof CircularProgressBase>, 'radius'> & {
    style?: ViewStyle
    className?: string
    value: number
    maxValue: number
}

const AdaptiveProgressCircle = ({
                                    style,
                                    className,
                                    children,
                                    value,
                                    maxValue,
                                    ...restProps
                                }: AdaptiveProgressCircle) => {
    const [radius, setRadius] = useState<number>(0)

    const onLayout = (event: LayoutChangeEvent) => {
        const {width, height} = event.nativeEvent.layout
        const newRadius = Math.min(width, height) / 2

        setRadius(newRadius)
    }

    return (
        <View onLayout={onLayout} style={style} className={className + ' w-full'}>
            {radius > 0 && (
                <CircularProgressBase value={maxValue == 0 ? 0 : value + 0.1} maxValue={maxValue + 0.1} radius={radius} {...restProps}>
                    {children}
                </CircularProgressBase>
            )}
        </View>
    )
}

export default AdaptiveProgressCircle
