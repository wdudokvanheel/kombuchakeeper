import {Brew} from "@/models/brew";
import {BrewService} from "@/services/brew-service";
import {BrewStateColor, BrewStateLabelColor} from "@/ui/brewstate-color";
import Text from "@/ui/components/text";
import {NativeWindColors} from "@/ui/nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Link} from "expo-router";
import React from 'react';
import {FlatList, Pressable, View} from "react-native";
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

const BrewListItem = ({brew}: BrewListItemProps) => {
    return (
        <Link href={`/brew/${brew.id}`} asChild>
            <Pressable>
                <View className="shadow-[0_6px_8px_rgba(0,0,0,0.05)] rounded-[38px] p-4 mt-4 bg-white">
                    <View className=" flex-row">
                        <View className=" w-1/4 p-2">
                            <View
                                className={`items-center justify-center rounded-3xl flex-1`}
                                style={{
                                    backgroundColor: BrewStateColor[brew.state]
                                }}
                            >
                                {(brew.state === 'F1' || brew.state === 'F2') && (
                                    <Text
                                        className="text-3xl font-bold"
                                        style={{color: BrewStateLabelColor[brew.state]}}
                                    >
                                        {brew.state}
                                    </Text>
                                )}
                                {brew.state === 'Failed' && (
                                    <Ionicons name="warning-sharp" size={45} color="white"/>
                                )}
                                {brew.state === 'Bottled' && (
                                    <Ionicons name="checkmark-outline" size={45} color="white"/>
                                )}
                            </View>
                        </View>

                        <View className="w-2/4 items-start ps-2 pt-2">
                            <Text className="text-2xl text-brown-800">
                                {brew.name}
                            </Text>
                        </View>

                        <View className="w-1/4 items-end py-2 px-2">
                            <CircularProgressBase
                                radius={32}
                                activeStrokeWidth={16}
                                inActiveStrokeWidth={16}
                                activeStrokeColor={brew.isCurrentFermentationComplete() ? NativeWindColors.green[600] : BrewStateColor[brew.state]}
                                inActiveStrokeColor={NativeWindColors.gray[200]}
                                value={brew.getDaysSinceStart() || 0}
                                maxValue={brew.getCurrentFermentationDuration()}
                            >
                                {(brew.state === 'F1' || brew.state === 'F2') && (
                                    !brew.isCurrentFermentationComplete() ?
                                        <Text className="text-xl font-extrabold m-0 p-0 text-brown-700">
                                            {brew.getDaysLeft() > 0 ? brew.getDaysLeft() : ''}
                                        </Text>
                                        :
                                        <Ionicons name="checkmark-outline" size={28}
                                                  color={NativeWindColors.green[800]}/>
                                )}
                            </CircularProgressBase>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}
