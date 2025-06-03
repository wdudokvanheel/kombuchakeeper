import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface AppHeaderProps {
    radius?: number;
}

const AppHeader: React.FC<AppHeaderProps> = ({
                                                 radius = 40,
                                             }) => {
    return (
        <View
            className="bg-brown-800 overflow-hidden w-full"
            style={[
                {
                    borderBottomLeftRadius: radius,
                    borderBottomRightRadius: radius,
                },
            ]}
        >
            <SafeAreaView className="p-0 px-8 m-0 bg-brown-800" edges={['top']}>
                <Text className="text-brown-100 text-4xl font-extrabold text-center p-0 mb-2" numberOfLines={1}
                      adjustsFontSizeToFit={true}>Kombucha Keeper</Text>
            </SafeAreaView>
        </View>
    );
};

export default AppHeader;
