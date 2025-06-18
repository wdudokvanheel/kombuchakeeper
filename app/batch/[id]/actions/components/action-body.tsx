import React from "react"
import {View} from "react-native"

type ActionBodyProps = {
    children: React.ReactNode
}

const ActionBody = ({children}: ActionBodyProps) => {

    return (
        <View
            className="flex-1 px-4"
        >
            {children}
        </View>
    )
}

export default ActionBody
