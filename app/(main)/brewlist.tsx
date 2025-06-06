import {Brew} from "@/models/brew";
import {BrewService} from "@/services/brew-service";
import {NativeWindColors} from "@/ui/nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Link} from "expo-router";
import React from 'react';
import {FlatList, Pressable, Text, View} from "react-native";
import {CircularProgressBase} from "react-native-circular-progress-indicator";

type BrewListItemProps = {
    brew: Brew
};

const BrewList = () => {
    const {data: brews = []} = BrewService.allBrews()

    return (
        <FlatList
            alwaysBounceVertical={false}
            className="overflow-visible z-0 mb-12 px-4"
            data={brews}
            keyExtractor={item => String(item.id || 0)}
            renderItem={({item}) => <BrewListItem brew={item}/>}
            scrollEnabled={true}
        />
    );
}

export default BrewList;

const stateLabelBackgroundColor: Record<string, string> = {
    F1: 'bg-yellow-500',
    F2: 'bg-orange-400',
    Bottled: 'bg-gray-300',
    Failed: 'bg-gray-300',
};

const BrewListItem = ({brew}: BrewListItemProps) =>
    <Link href={`/brew/${brew.id}`} asChild>
        <Pressable>
            <View className="bg-white shadow-[0_6px_8px_rgba(0,0,0,0.05)] rounded-[38px] p-4 mt-4">
                <View className="flex-row">
                    <View className="w-1/4 p-2">
                        <View
                            className={`items-center justify-center rounded-3xl flex-1 ${stateLabelBackgroundColor[brew.state]}`}
                        >
                            {(brew.state === 'F1' || brew.state === 'F2') && (
                                <Text className="text-3xl text-white">{brew.state}</Text>
                            )}
                            {brew.state === 'Failed' && (
                                <Ionicons name="warning-sharp" size={45} color="white"/>
                            )}
                            {brew.state === 'Bottled' && (
                                <Ionicons name="checkmark-outline" size={45} color="white"/>
                            )}
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
                            activeStrokeColor={brew.isCurrentFermentationComplete() ? NativeWindColors.green[500] : NativeWindColors.brown[600]}
                            activeStrokeSecondaryColor={brew.isCurrentFermentationComplete() ? NativeWindColors.green[500] : NativeWindColors.brown[700]}
                            inActiveStrokeColor={NativeWindColors.gray[200]}
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
        </Pressable>
    </Link>
