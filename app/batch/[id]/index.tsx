import FermentationPanel from "@/app/batch/[id]/components/fermentation-panel"
import NotesPanel from "@/app/batch/[id]/components/notes-panel"
import {useBatch} from "@/contexts/batch-context"
import {Batch} from '@/models/batch'
import {BatchService} from "@/services/batch-service"
import {BatchStateColor, BatchStateLabelColor} from "@/ui/batch-state-color"
import Text from "@/ui/components/text"
import {NativeWindColors} from '@/ui/nativewind'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useRouter} from 'expo-router'
import React from 'react'
import {Alert, TouchableOpacity, View} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context"
import Svg, {Path} from 'react-native-svg'

const BatchDetail = () => {
    const router = useRouter()
    const batch = useBatch()
    const insets = useSafeAreaInsets()

    const handleEdit = () => {
        if (batch) {
            router.push(`/batch/${batch.id}/actions`)
        }
    }

    const handleNotes = () => {
        if (batch) {
            router.push(`/batch/${batch.id}/notes`)
        }
    }

    const handleDelete = () => {
        if (batch.id) {
            Alert.alert(
                'Delete batch',
                'Are you sure you want to delete this batch?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                            BatchService.deleteBatch(batch.id!)
                            router.back()
                        },
                    },
                ],
            )
        }
    }

    const foreground = BatchStateLabelColor[batch.state] ?? NativeWindColors.gray[900]

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1" style={{
                marginBottom: Math.max(insets.bottom, 16)
            }}>
                <BatchDetailHeader batch={batch} onEdit={handleEdit} onDelete={handleDelete}>

                    {(!batch.hasEnded()) &&
                        <View className="mb-12 mt-0">
                            <Text
                                className="text-center text-9xl font-bold"
                                style={{color: foreground}}
                            >
                                {batch.getDaysLeft()}
                            </Text>
                            <Text
                                className="text-center  text-xl -mt-4"
                                style={{color: foreground}}
                            >
                                days remaining
                            </Text>
                        </View>
                    }
                </BatchDetailHeader>

                <View className="px-4 flex-1">
                    <Text className="my-4 text-lg font-semibold text-brown-800">Fermentation</Text>

                    <View className="flex-row gap-8">
                        <FermentationPanel
                            title="First"
                            icon="bottle-tonic"
                            color={NativeWindColors.yellow[400]}
                            labelColor={NativeWindColors.brown[800]}
                            start={batch.createdAt}
                            started={true}
                            end={batch.firstFermentationEnd}
                        />

                        <FermentationPanel
                            title="Second"
                            icon="bottle-soda-classic"
                            color={NativeWindColors.orange[400]}
                            labelColor={NativeWindColors.brown[800]}
                            start={batch.firstFermentationEnd}
                            started={batch.hasFirstFermentationEnded()}
                            end={batch.secondFermentationEnd}
                        />
                    </View>

                    <Text className="my-4 text-lg font-semibold text-brown-800">Notes</Text>

                    <NotesPanel batch={batch} onEdit={handleNotes}/>
                </View>
            </View>
        </View>
    )
}

export default BatchDetail

type BatchDetailHeaderProps = {
    batch: Batch
    onEdit: () => void
    onDelete: () => void
    children?: React.ReactNode
}

const BatchDetailHeader = ({batch, onEdit, onDelete, children}: BatchDetailHeaderProps) => {
    const title = batch.name
    const background = BatchStateColor[batch.state] ?? NativeWindColors.gray[200]
    const foreground = BatchStateLabelColor[batch.state] ?? NativeWindColors.gray[900]
    const insets = useSafeAreaInsets()
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <>
            <View
                className="relative pb-6"
                style={{paddingTop: insets.top, backgroundColor: background}}
            >
                <View className="px-4">
                    <View className="flex-row items-center mt-4 mb-8">
                        <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                            <View
                                className="w-12 h-12 rounded-full border justify-center items-center"
                                style={{borderColor: foreground}}
                            >
                                <Ionicons name="chevron-back" size={20} color={foreground}/>
                            </View>
                        </TouchableOpacity>
                        <Text
                            className=" text-2xl ml-4 flex-1"
                            style={{color: foreground}}
                        >
                            {title}
                        </Text>

                        <TouchableOpacity onPress={onDelete}>
                            <Ionicons size={24} name="trash" className="pe-4 opacity-80" color={foreground}/>
                        </TouchableOpacity>
                    </View>

                    {children}
                </View>
            </View>

            <View className="relative items-center" style={{height: 40}}>
                <Svg width="100%" height={40} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <Path d="M0 0 H100 V100 Q50 -100 0 100 Z" fill={background}/>
                </Svg>

                {(!batch.hasEnded()) && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onEdit}
                        className={`absolute items-center justify-center shadow-md ${batch.isCurrentFermentationComplete() ? 'bg-green-500 shadow-green-500' : 'bg-brown-800 shadow-black/50'}`}
                        style={
                            {
                                marginTop: -32,
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                                elevation: 10,
                            }
                        }
                    >
                        <Ionicons name={batch.isCurrentFermentationComplete() ? 'checkmark' : 'pencil'} size={32}
                                  color={NativeWindColors.brown[100]}/>
                    </TouchableOpacity>
                )}
            </View>

            {/* Decorative circles */
            }
            <View className="absolute inset-0 pointer-events-none">
                <View className="absolute -top-[140px] -right-[50px] w-56 h-56 rounded-full bg-white/15"/>
                <View className="absolute top-24 right-16 w-20 h-20 rounded-full bg-white/15"/>
                <View className="absolute top-[160px] right-[-60px] w-40 h-40 rounded-full bg-white/15"/>
                <View className="absolute top-[180px] left-[-40px] w-20 h-20 rounded-full bg-white/15"/>
                <View className="absolute top-[140px] left-[75px] w-10 h-10 rounded-full bg-white/15"/>
            </View>
        </>
    )
}