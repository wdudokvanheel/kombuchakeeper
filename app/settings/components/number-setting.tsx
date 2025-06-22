import Text from "@/ui/components/text"
import React from "react"
import {View} from "react-native"
import InputSpinner from "react-native-input-spinner"

type NumberSettingProps = {
    title: string
    description: string
    value: number | undefined
    onChange: (v: number) => void
    min: number
    max: number
    color: string
    textColor: string
}

const NumberSetting = ({
                           title,
                           description,
                           value,
                           onChange,
                           min,
                           max,
                           color,
                           textColor
                       }: NumberSettingProps) => {
    return (
        <View className="flex-row bg-white rounded-[2rem] p-4 min-h-40">
            <View className="flex-1 pe-4">
                <Text className="text-gray-900 text-2xl font-semibold">
                    {title}
                </Text>
                <Text className="text-gray-800 mt-2">
                    {description}
                </Text>
            </View>

            <View className="items-end">
                <InputSpinner
                    max={max}
                    min={min}
                    step={1}
                    color={color}
                    value={value}
                    onChange={onChange}
                    skin="modern"
                    editable={false}
                    style={{
                        shadowOpacity: 0,
                        padding: 8,
                        marginVertical: "auto",
                        elevation: 0
                    }}
                    inputStyle={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: textColor
                    }}
                />
            </View>
        </View>
    )
}

export default NumberSetting
