import React, {forwardRef} from 'react'
import {Text as RNText, TextProps as RNTextProps} from 'react-native'

type Props = RNTextProps & {
    className?: string
}

const BASE_CLASS = 'font-sans'

const Text = forwardRef<React.ComponentRef<typeof RNText>, Props>(
    ({className, ...rest}, ref) => {
        let combined = BASE_CLASS
        if (className) {
            combined = `${BASE_CLASS} ${className}`
        }
        return <RNText ref={ref} className={combined} {...rest} />
    }
)

Text.displayName = 'Text'

export default Text