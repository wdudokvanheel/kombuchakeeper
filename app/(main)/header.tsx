import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface AppHeaderProps {
    radius?: number;
}

const AppHeader: React.FC<AppHeaderProps> = ({
                                                 radius = 40,
                                             }) => {
    const insets = useSafeAreaInsets();

    return (
        <View className="p-0 px-8 m-0 bg-brown-800 overflow-hidden w-full z-50" edges={['top']}
              style={[
                  {
                      paddingTop: insets.top,
                      borderBottomLeftRadius: radius,
                      borderBottomRightRadius: radius,
                  },
              ]}>
            <Text className="text-brown-100 text-3xl font-extrabold text-center p-0 mb-4 uppercase">
                Kombucha Keeper
            </Text>
        </View>
    );
};

export default AppHeader;
