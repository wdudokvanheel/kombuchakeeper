import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import {Brew} from "@/models/brew";
import {CircularProgressBase} from "react-native-circular-progress-indicator";
import Ionicons from "@expo/vector-icons/Ionicons";
import {BrewService} from "@/services/brew-service";

type BrewListItemProps = {
    brew: Brew;
};

const BrewList = () => {
    const [brews, setBrews] = useState<Brew[]>([])
    const updateList = () =>
        BrewService
            .fetchBrews()
            .then(brews => setBrews(brews))

    useEffect(() => {
        updateList()
    }, []);

    return (
        <View className="w-fit">
            <FlatList
                data={brews}
                keyExtractor={item => String(item.id || 0)}
                renderItem={({item}) => <BrewListItem brew={item}/>}
                scrollEnabled={false}
            />
        </View>
    );
}
export default BrewList;

const stateLabelBackgroundColor: Record<string, string> = {
    F1: 'bg-yellow-400',
    F2: 'bg-orange-400',
    Bottled: 'bg-gray-300',
    Failed: 'bg-gray-300',
};

const BrewListItem = ({brew}: BrewListItemProps) => (
    <View className="bg-white shadow-[0_6px_8px_rgba(0,0,0,0.05)] rounded-[38px] p-4 flex-1 mb-4 mx-4">
        <View className="flex-row items-start h-fit">
            <View className="w-1/4 h-full justify-center">
                <View
                    className={`items-center justify-center my-2 mx-2 rounded-3xl flex-1 ${stateLabelBackgroundColor[brew.state]}`}>
                    {(brew.state === 'F1' || brew.state === 'F2') && (
                        <Text className="text-3xl  text-brown-950">{brew.state}</Text>
                    )}
                    {brew.state === 'Failed' && <Ionicons name="warning-sharp" size={45} color="white"/>}
                    {brew.state === 'Bottled' && <Ionicons name="checkmark-outline" size={45} color="white"/>}
                </View>
            </View>
            <View className="w-2/4 items-start ps-2 pt-1">
                <Text className="text-xl text-brown-800">{brew.name}</Text>
            </View>
            <View className="w-1/4 items-end py-2 px-2">
                <CircularProgressBase
                    radius={32}
                    activeStrokeWidth={16}
                    inActiveStrokeWidth={16}
                    activeStrokeColor={brew.isCurrentFermentationComplete() ? '#9BB068' : '#926247'}
                    activeStrokeSecondaryColor={brew.isCurrentFermentationComplete() ? '#9BB068' : '#704A33'}
                    inActiveStrokeColor={'#C0A091'}
                    value={brew.getDaysSinceStart() || 0}
                    maxValue={brew.getCurrentFermentationDuration()}
                >
                    <Text className="text-2xl font-light m-0 p-0 text-brown-700">
                        {brew.getDaysLeft() > 0 ? brew.getDaysLeft() : ''}
                    </Text>
                </CircularProgressBase>
            </View>
        </View>
    </View>
);
