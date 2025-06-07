import {NativeWindColors} from "@/ui/nativewind";
import React, {useState} from "react";
import {TextInput, View} from "react-native";

interface ThemedTextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
                                                             value,
                                                             onChangeText,
                                                             placeholder,
                                                         }) => {
    const [focused, setFocused] = useState(false);

    return (
        <View
            className="w-full rounded-[64px] border-[6px] border-green-600 mb-6"
            style={[{
                borderColor: focused ? (NativeWindColors.brown[400] + '30') : '#FFFFFF'
            }]}
        >
            <TextInput
                multiline={false}
                placeholder={placeholder}
                numberOfLines={1}
                selectionColor={NativeWindColors.orange[300]}
                placeholderTextColor={NativeWindColors.gray[400]}
                maxLength={15}
                value={value}
                onChangeText={onChangeText}
                className="bg-white font-semibold text-purple-600 rounded-[64px] p-4 border border-white focus:border-brown-800"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={[
                    {
                        fontSize: 16,
                        color: NativeWindColors.gray[800],
                    }
                ]}
            />
        </View>
    );
};

export default ThemedTextInput;
