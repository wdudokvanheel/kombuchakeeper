import {NativeWindColors} from '@/ui/nativewind'
import WheelPicker, {
    PickerItem,
    RenderItem,
    usePickerItemHeight,
    useScrollContentOffset,
} from '@wdudokvanheel/react-native-wheel-picker'
import React, {useCallback, useMemo} from 'react'
import {Animated, StyleProp, TextStyle, View} from 'react-native'

type NumberSelectorProps = {
    value: number
    onChange: (value: number) => void
    start: number
    end: number
    itemHeight?: number
    width?: number
}

const NumberPicker = ({
                            value,
                            onChange,
                            start,
                            end,
                            width = 200,
                            itemHeight = 128,
                        }: NumberSelectorProps) => {

    const data = useMemo<PickerItem<number>[]>(() => {
        const length = end - start + 1
        return Array.from({length}, (_, i) => {
            const v = start + i
            return {value: v, label: v.toString()}
        })
    }, [start, end])

    const renderItem: RenderItem<PickerItem<number>> = useCallback(
        props => <Item {...props} />,
        [],
    )

    return (
        <View className='flex-1'>
            <WheelPicker
                data={data}
                value={value}
                overScrollMode={'never'}
                itemHeight={itemHeight}
                renderItem={renderItem}
                style={{marginVertical: -150}}
                itemTextStyle={{fontSize: 72, fontWeight: 'bold'}}
                overlayItemStyle={{
                    opacity: 1,
                    backgroundColor: NativeWindColors.green[400],
                    borderWidth: 8,
                    borderColor: NativeWindColors.green[200],
                    borderRadius: 128,
                }}
                width={width}
                onValueChanged={({item: {value: newValue}}) => onChange(newValue)}
            />
        </View>
    )
}

export default NumberPicker

const Item = ({
                  item: {value: itemValue, label},
                  index,
                  itemTextStyle,
              }: {
    item: PickerItem<number>
    index: number
    itemTextStyle: StyleProp<TextStyle> | undefined
}) => {
    const height = usePickerItemHeight()
    const offset = useScrollContentOffset()
    const inputRange = useMemo(
        () => [height * (index - 1), height * index, height * (index + 1)],
        [height, index],
    )

    const activeOpacity = useMemo(
        () =>
            offset.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
            }),
        [inputRange, offset],
    )

    const inactiveOpacity = useMemo(
        () =>
            offset.interpolate({
                inputRange,
                outputRange: [1, 0, 1],
                extrapolate: 'clamp',
            }),
        [inputRange, offset],
    )

    return (
        <Animated.View style={{height, justifyContent: 'center'}}>
            <Animated.Text
                style={[
                    {
                        position: 'absolute',
                        lineHeight: height,
                        textAlign: 'center',
                        width: '100%',
                        opacity: inactiveOpacity,
                        color: 'black',
                    },
                    itemTextStyle,
                ]}
            >
                {label ?? itemValue}
            </Animated.Text>
            <Animated.Text
                style={[
                    {
                        position: 'absolute',
                        lineHeight: height,
                        textAlign: 'center',
                        width: '100%',
                        opacity: activeOpacity,
                        color: 'white',
                    },
                    itemTextStyle,
                ]}
            >
                {label ?? itemValue}
            </Animated.Text>
        </Animated.View>
    )
}
