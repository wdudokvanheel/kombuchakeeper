import React, {forwardRef} from 'react'
import {Platform, StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle} from 'react-native'

type Props = RNTextProps & {
    className?: string
}

const BASE_CLASS = 'font-sans'

const WEIGHT_CLASS_TO_SUFFIX: Record<string, string> = {
    'font-thin': '100Thin',
    'font-extralight': '200ExtraLight',
    'font-light': '300Light',
    'font-normal': '400Regular',
    'font-medium': '500Medium',
    'font-semibold': '600SemiBold',
    'font-bold': '700Bold',
    'font-extrabold': '800ExtraBold',
    'font-black': '900Black'
}

const Text = forwardRef<React.ComponentRef<typeof RNText>, Props>(
    ({className, style, ...rest}, ref) => {
        let combined = BASE_CLASS
        if (className) {
            combined = `${BASE_CLASS} ${className}`
        }

        let resolvedStyle: StyleProp<TextStyle> = style

        if (Platform.OS === 'android') {
            const lower = combined.toLowerCase()

            let suffix = '400Regular'
            for (const key in WEIGHT_CLASS_TO_SUFFIX) {
                if (lower.includes(key)) {
                    suffix = WEIGHT_CLASS_TO_SUFFIX[key]
                }
            }

            const italic = lower.includes('italic')
            const family = `Urbanist_${suffix}${italic ? '_Italic' : ''}`

            resolvedStyle = [
                style,
                {
                    fontFamily: family,
                    fontWeight: undefined,
                    fontStyle: undefined
                }
            ]
        }

        return <RNText ref={ref} className={combined} style={resolvedStyle} {...rest} />
    }
)


Text.displayName = 'Text'

export default Text
