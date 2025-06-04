import {NativeWindColors} from "@/ui/nativewind";
import React, {useState} from "react";
import {TextInput, View} from "react-native";

interface BorderedTextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const ThemedTextInput: React.FC<BorderedTextInputProps> = ({
                                                               value,
                                                               onChangeText,
                                                               placeholder,
                                                           }) => {
    const [focused, setFocused] = useState(false);

    return (
        <View
            className={`w-full rounded-[64px] border-[6px] mb-6 ${
                focused ? "border-brown-300/50" : "border-white/0"
            }`}
        >
            <TextInput
                multiline={false}
                placeholder={placeholder}
                numberOfLines={1}
                selectionColor={NativeWindColors.orange[300]}
                maxLength={15}
                value={value}
                onChangeText={onChangeText}
                className="bg-white font-semibold text-purple-600 rounded-[3em] p-6 border border-white focus:border-brown-900"
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
