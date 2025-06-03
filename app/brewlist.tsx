import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import {Brew, BrewState} from "@/models/brew";
import {CircularProgressBase} from "react-native-circular-progress-indicator";
import Ionicons from "@expo/vector-icons/Ionicons";

type BrewListItemProps = {
    brew: Brew;
};

const stateBackgroundColor: Record<string, string> = {
    F1: 'bg-yellow-400',
    F2: 'bg-orange-400',
    Bottled: 'bg-gray-300',
    Failed: 'bg-gray-300',
};

const BrewList = () => {
    const [brews, setBrews] = useState<Brew[]>([])

    useEffect(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        const tenDaysAgo = new Date(today);
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        const fifteenDaysAgo = new Date(today);
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
        const fourteenDaysFromNow = new Date(today);
        fourteenDaysFromNow.setDate(fourteenDaysFromNow.getDate() + 14);

        const brews: Brew[] = [
            // 1) Just started yesterday in F1, with a 14-day target for F1
            new Brew({
                id: 1,
                name: 'Yesterday’s Starter',
                createdAt: yesterday,
                state: BrewState.FirstFermentation,
                firstFermentationEnd: fourteenDaysFromNow,
            }),

            // 2) Still in F1, but its target (firstFermentationEnd) is today
            new Brew({
                id: 2,
                name: 'Today’s F1 Target',
                createdAt: tenDaysAgo,
                state: BrewState.FirstFermentation,
                firstFermentationEnd: today,
            }),

            // 3) Currently in F2, with secondFermentationEnd two days from now
            new Brew({
                id: 3,
                name: 'F2 In Progress',
                createdAt: tenDaysAgo,
                state: BrewState.SecondFermentation,
                firstFermentationEnd: fiveDaysAgo,
                secondFermentationEnd: twoDaysFromNow,
            }),

            // 4) Already completed (Bottled)
            new Brew({
                id: 4,
                name: 'Completed Batch',
                createdAt: fifteenDaysAgo,
                state: BrewState.Bottled,
                firstFermentationEnd: tenDaysAgo,
                secondFermentationEnd: fiveDaysAgo,
                notes: 'Tastes great—bottled 5 days ago and stored cold.',
            }),

            // 5) Failed brew
            new Brew({
                id: 5,
                name: 'Failed Attempt',
                createdAt: tenDaysAgo,
                state: BrewState.Failed,
                notes: 'Mold appeared midway through F1.',
            }),
        ];

        setBrews(brews);
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

const BrewListItem = ({brew}: BrewListItemProps) => (
    <View className="bg-white shadow-[0_6px_8px_rgba(0,0,0,0.05)] rounded-[38px] p-4 flex-1 mb-4 mx-4">
        <View className="flex-row items-start h-fit">
            <View className="w-1/4 h-full justify-center">
                <View
                    className={`items-center justify-center my-2 mx-2 rounded-3xl flex-1 ${stateBackgroundColor[brew.state]}`}>
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
export default BrewList;
