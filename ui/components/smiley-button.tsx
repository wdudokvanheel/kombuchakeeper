import Smiley, {SmileyColors, SmileyVariant} from "@/ui/graphics/smiley"
import React from 'react'
import {TouchableOpacity, View} from 'react-native'

type SmileyButtonProps = {
    variant: SmileyVariant
    size?: number
    selected?: boolean
    shaded?: boolean
    onSelect?: (v: SmileyVariant) => void
}

const SmileyButton = ({
                          variant,
                          size = 96,
                          selected = false,
                          shaded = false,
                          onSelect
                      }: SmileyButtonProps) => {
    const handlePress = () => {
        if (onSelect) {
            onSelect(variant)
        }
    }

    const {border} = SmileyColors[variant]

    const content = (
        <View
            style={{
                width: size + 24,
                height: size + 24,
                borderRadius: (size + 24) / 2,
                borderWidth: 12,
                borderColor: selected ? border : '#FFFFFF00',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Smiley variant={variant} size={size} shaded={shaded && !selected}/>
        </View>
    )

    if (!onSelect) {
        return content
    }

    return (
        <TouchableOpacity activeOpacity={0.75} onPress={handlePress}>
            {content}
        </TouchableOpacity>
    )
}

export default SmileyButton
