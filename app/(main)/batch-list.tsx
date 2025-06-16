import {Batch, BatchState} from "@/models/batch"
import {BatchStateColor, BatchStateLabelColor} from "@/ui/batch-state-color"
import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {Link} from "expo-router"
import React from 'react'
import {FlatList, TouchableOpacity, View} from "react-native"
import {CircularProgressBase} from "react-native-circular-progress-indicator"

const BatchStateDarkColor: Record<BatchState, string> = {
    [BatchState.F1]: NativeWindColors.yellow[600],
    [BatchState.F2]: NativeWindColors.orange[600],
    [BatchState.Bottled]: NativeWindColors.green[800],
    [BatchState.Failed]: NativeWindColors.gray[800],
}

type BatchListProps = {
    data: Batch[]
}

const BatchList = ({data}: BatchListProps) => {
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
                <View className="shadow-[0_6px_8px_rgba(0,0,0,0.05)] rounded-[38px] p-4 mt-4 bg-white">
                    <View className=" flex-row">
                        <View className=" w-1/4 p-2">
                            <View
                                className={`items-center justify-center rounded-3xl flex-1`}
                                style={{
                                    backgroundColor: BatchStateColor[batch.state]
                                }}
                            >
                                {(batch.state === BatchState.F1 || batch.state === BatchState.F2) && (
                                    <Text
                                        className="text-3xl font-bold"
                                        style={{color: BatchStateLabelColor[batch.state]}}
                                    >
                                        {batch.state}
                                    </Text>
                                )}
                                {batch.state === BatchState.Failed && (
                                    <Ionicons name="warning-sharp" size={45} color="white"/>
                                )}
                                {batch.state === BatchState.Bottled && (
                                    <Ionicons name="checkmark-outline" size={45} color="white"/>
                                )}
                            </View>
                        </View>

                        <View className="w-2/4 items-start ps-2 pt-2 pb-2 justify-between">
                            <Text className="text-xl font-medium text-brown-800" numberOfLines={1}>
                                {batch.name}
                            </Text>
                            {batch.getDaysLeft() == 0 &&
                                <Text className="text-lg font-medium text-brown-800/65" numberOfLines={1}>
                                    {batch.state == BatchState.F1 ? 'Ready for F2' : 'Ready to be bottled'}
                                </Text>
                            }
                            {batch.getDaysLeft() != 0 &&
                                <Text className="text-lg font-medium text-brown-800/65" numberOfLines={1}>
                                    Started on {formattedDate}
                                </Text>
                            }
                        </View>

                        <View className="w-1/4 items-end py-2 px-2">
                            <CircularProgressBase
                                key={`${batch.id}-${batch.getDaysSinceStart()}-${batch.getCurrentFermentationDuration()}`}
                                radius={32}
                                activeStrokeWidth={16}
                                inActiveStrokeWidth={16}
                                activeStrokeColor={batch.isCurrentFermentationComplete() ? NativeWindColors.green[600] : BatchStateColor[batch.state]}
                                inActiveStrokeColor={NativeWindColors.gray[200]}
                                value={batch.getDaysSinceStart() || 0}
                                maxValue={batch.getCurrentFermentationDuration()}
                            >
                                {(batch.state === BatchState.F1 || batch.state === BatchState.F2) && (
                                    !batch.isCurrentFermentationComplete() ?
                                        <Text
                                            className="text-xl font-extrabold m-0 p-0 "
                                            style={{
                                                color: BatchStateDarkColor[batch.state]
                                            }}
                                        >
                                            {batch.getDaysLeft() > 0 ? batch.getDaysLeft() : ''}
                                        </Text>
                                        :
                                        <Ionicons name="checkmark-outline" size={28}
                                                  color={NativeWindColors.green[800]}/>
                                )}
                            </CircularProgressBase>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

