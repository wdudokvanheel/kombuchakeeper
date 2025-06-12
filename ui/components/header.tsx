import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = {
    background: string
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({background, children}: HeaderProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="p-0 px-8 m-0 rounded-b-[50px] overflow-hidden w-full z-50"
            style={{
                paddingTop: insets.top,
                backgroundColor: background,
            }}
        >
            {children}
        </View>
    );
};

export default Header;
