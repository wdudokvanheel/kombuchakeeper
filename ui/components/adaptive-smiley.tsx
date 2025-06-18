import React, {useState} from "react"
import {LayoutChangeEvent, View, ViewStyle} from "react-native"
import Smiley, {SmileyProps} from "../graphics/smiley"

type AdaptiveSmileyProps = Omit<SmileyProps, "size"> & {
    style?: ViewStyle
}

const AdaptiveSmiley = ({variant, shaded, style}: AdaptiveSmileyProps) => {
    const [size, setSize] = useState(0)

    const onLayout = (e: LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout
        const nextSize = Math.min(width, height)
        if (nextSize !== size) {
            setSize(nextSize)
        }
    }

    return (
        <View
            onLayout={onLayout}
            className="flex-1 items-center justify-center"
            style={style}
        >
            {size > 0 && (
                <Smiley variant={variant} shaded={shaded} size={size}/>
            )}
        </View>
    )
}

export default AdaptiveSmiley
