import {Batch, BatchState} from "@/models/batch"
import {BatchStateColor, BatchStateLabelColor} from "@/ui/batch-state-color"
import AdaptiveProgressCircle from "@/ui/components/adaptive-progress-circle"
import AdaptiveSmiley from "@/ui/components/adaptive-smiley"
import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {Link} from "expo-router"
import React from 'react'
import {FlatList, TouchableOpacity, View} from "react-native"

const BatchStateDarkColor: Record<BatchState, string> = {
    [BatchState.F1]: NativeWindColors.yellow[600],
    [BatchState.F2]: NativeWindColors.orange[600],
    [BatchState.Complete]: NativeWindColors.green[800],
    [BatchState.Failed]: NativeWindColors.gray[800],
}

type BatchListProps = {
    data: Batch[],
    children: React.ReactNode
}

const BatchList = ({data, children}: BatchListProps) => {
    if (data.length === 0) {
        return (
            <View className="flex-1 p-4">
                <View className="items-center my-auto">
                    {children}
                </View>
            </View>
        )
    }
    return (
        <FlatList
            alwaysBounceVertical={false}
            className="overflow-visible z-0 mb-12 px-4"
            data={data}
            keyExtractor={item => String(item.id || 0)}
            renderItem={({item}) => <BatchListItem batch={item}/>}
            scrollEnabled={true}
        />
    )
}

export default BatchList

type BatchListItemProps = {
    batch: Batch
}

const BatchListItem = ({batch}: BatchListItemProps) => {
    const formattedDate = new Intl.DateTimeFormat(undefined, {
        day: '2-digit',
        month: '2-digit'
    }).format(new Date(batch.createdAt))

    return (
        <Link href={`/batch/${batch.id}`} asChild>
            <TouchableOpacity activeOpacity={0.5}>
                <View className="shadow-[0_6px_8px_rgba(0,0,0,0.05)] rounded-[38px] p-5 mt-4 bg-white">
                    <View className="flex-row">
                        <View className="w-1/4 h-full">
                            <View
                                className={`items-center justify-center rounded-3xl flex-1`}
                                style={{
                                    backgroundColor: BatchStateColor[batch.state]
                                }}
                            >
                                {(batch.state === BatchState.F1 || batch.state === BatchState.F2) && (
                                    <Text
                                        className="text-4xl font-bold tracking-widest"
                                        style={{color: BatchStateLabelColor[batch.state]}}
                                    >
                                        {batch.state}
                                    </Text>
                                )}
                                {batch.state === BatchState.Failed && (
                                    <Ionicons name="warning-sharp" size={45} color="white"/>
                                )}
                                {batch.state === BatchState.Complete && (
                                    <Ionicons name="checkmark-outline" size={45} color="white"/>
                                )}
                            </View>
                        </View>

                        <View className="flex-1 flex-row">
                            <View className="flex-1 items-start px-4 justify-between gap-0">
                                <Text className="text-xl font-medium" numberOfLines={1}
                                      style={{color: batch.isCurrentFermentationComplete() && !batch.hasEnded() ? NativeWindColors.green[800] : NativeWindColors.brown[800]}}>
                                    {batch.name}
                                </Text>

                                {batch.getDaysLeft() == 0 && !batch.hasEnded() &&
                                    <Text className="text-lg font-bold text-white rounded-full bg-green-600 py-0 px-2"
                                          numberOfLines={1}>
                                        {batch.state == BatchState.F1 ? 'Ready for F2' : 'Ready to be bottled'}
                                    </Text>
                                }
                                {(batch.getDaysLeft() != 0 || batch.hasEnded()) &&
                                    <Text className="text-lg font-medium text-brown-800/65" numberOfLines={1}>
                                        Started on {formattedDate}
                                    </Text>
                                }
                            </View>


                            <View className="p-0 w-1/4 aspect-square">
                                {(!batch.hasEnded() || !batch.hasRating()) &&
                                    <ItemProgressCircle batch={batch}/>
                                }
                                {batch.hasEnded() && batch.hasRating() &&
                                    <>
                                        <AdaptiveSmiley variant={batch.rating!}/>
                                    </>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

type ItemProgressCircleProps = {
    batch: Batch
}

const ItemProgressCircle = ({batch}: ItemProgressCircleProps) => {
    let value = batch.getDaysSinceStart() || 0
    let maxValue = batch.getCurrentFermentationDuration() || 0

    if (batch.hasEnded()) {
        value = 1
        maxValue = 1
    }

    return (
        <AdaptiveProgressCircle
            className="aspect-square"
            activeStrokeWidth={24}
            inActiveStrokeWidth={24}
            activeStrokeColor={batch.isCurrentFermentationComplete() ? NativeWindColors.green[600] : BatchStateColor[batch.state]}
            inActiveStrokeColor={NativeWindColors.gray[200]}
            value={value}
            maxValue={maxValue}
        >
            {(batch.state === BatchState.F1 || batch.state === BatchState.F2) && (
                !batch.isCurrentFermentationComplete() ?
                    <Text
                        className="text-2xl font-extrabold m-0 p-0 "
                        style={{
                            color: BatchStateDarkColor[batch.state]
                        }}
                    >
                        {(batch.getDaysLeft() || 0) > 0 ? batch.getDaysLeft() : ''}
                    </Text>
                    :
                    <Ionicons name="checkmark-outline" size={36} color={NativeWindColors.green[800]}/>
            )}
            {batch.hasEnded() &&
                <Ionicons name="checkmark-outline" size={36} color={NativeWindColors.green[800]}/>
            }
        </AdaptiveProgressCircle>
    )
}