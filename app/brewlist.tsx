import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import {Brew, createBrew} from "@/models/brew";

const BrewList = () => {
    const [brews, setBrews] = useState<Brew[]>([])

    useEffect(() => {
        let brews = [
            createBrew({id: 1, name: 'First brew'}),
            createBrew({id: 2, name: 'Test brew'}),
            createBrew({id: 3, name: 'Failed brew'}),
            createBrew({id: 4, name: 'Finished brew'})
        ];

        setBrews(brews)
    }, []);

    let renderItem = ({item}) => (
        <View className="bg-brown-200 rounded-3xl p-4 flex-1 mt-4 ">
            <Text className="absolute top-4 right-4 text-sm font-semibold text-brown-900">
                #{item.id}
            </Text>
            <Text className="text-xl text-brown-900">{item.name}</Text>
            <Text className="opacity-75 mt-8 text-sm text-brown-900">Started {item.created}</Text>
        </View>
    )

    return (
        <View className="w-fit">
            <FlatList
                data={brews}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </View>
    );
}

export default BrewList;
