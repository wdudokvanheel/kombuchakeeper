import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = {
    background: string
    useSafeArea?: boolean
    children: React.ReactNode
}

const ThemedHeader: React.FC<HeaderProps> = ({background, children, useSafeArea = false}: HeaderProps) => {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="p-0 px-4 m-0 rounded-b-[40px] overflow-hidden w-full z-50"
            style={{
                paddingTop: useSafeArea ? insets.top : 16,
                backgroundColor: background,
            }}
        >
            {children}
        </View>
    )
}

export default ThemedHeader
