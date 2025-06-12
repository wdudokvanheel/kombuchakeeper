import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type AppHeaderProps = {
    radius?: number
    children: React.ReactNode
}

const AppHeader: React.FC<AppHeaderProps> = ({
                                                 radius = 40,
                                                 children,
                                             }) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="p-0 px-8 m-0 bg-brown-800 overflow-hidden w-full z-50"
            style={[
                {
                    paddingTop: insets.top,
                    borderBottomLeftRadius: radius,
                    borderBottomRightRadius: radius,
                },
            ]}
        >
            {children}
        </View>
    );
};

export default AppHeader;
