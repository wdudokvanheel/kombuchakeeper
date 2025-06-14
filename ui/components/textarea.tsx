import {NativeWindColors} from "@/ui/nativewind"
import React, {useState} from "react"
import {TextInput, View} from "react-native"

type ThemedTextAreaProps = {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
}

const ThemedTextArea = ({
                            value,
                            onChangeText,
                            placeholder,
                        }: ThemedTextAreaProps) => {
    const [focused, setFocused] = useState(false)

    return (
        <View
            className="flex-1 rounded-[32px] border-[6px] p-0 border-brown-600"
            style={[{
                borderColor: focused ? (NativeWindColors.brown[400] + '30') : '#FFFFFF',
                backgroundColor: focused ? (NativeWindColors.brown[400] + '30') : '#FFFFFF'
            }]}
        >
            <TextInput
                multiline
                numberOfLines={10}
                placeholder={placeholder}
                selectionColor={NativeWindColors.orange[300]}
                placeholderTextColor={NativeWindColors.gray[400]}
                value={value}
                onChangeText={onChangeText}
                className="bg-white font-semibold rounded-[32px] p-4 border border-white focus:border-brown-800"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={[{
                    textAlignVertical: 'top',
                    flexGrow: 1,
                    fontSize: 18,
                    color: NativeWindColors.gray[800],
                }]}
            />
        </View>
    )
}

export default ThemedTextArea
