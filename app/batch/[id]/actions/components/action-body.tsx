import React from "react"
import {View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"

type ActionBodyProps = {
    children: React.ReactNode
}

const ActionBody = ({children}: ActionBodyProps) => {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="flex-1 p-4 pt-8 items-center"
            style={{
                paddingBottom: insets.bottom + 16
            }}
        >
            {children}
        </View>
    )
}

export default ActionBody