import {useBatch} from '@/contexts/batch-context'
import {useBatchService} from "@/contexts/batch-service-context"
import Text from '@/ui/components/text'
import Textarea from '@/ui/components/textarea'
import {NativeWindColors} from '@/ui/nativewind'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useRouter} from 'expo-router'
import React, {useState} from 'react'
import {Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native'
import {useTranslation} from 'react-i18next'

const NotesModal = () => {
    const router = useRouter()
    const batch = useBatch()
    const batchService = useBatchService()
    const {t} = useTranslation()

    const [notes, setNotes] = useState(batch.notes || '')

    const handleBack = () => {
        router.back()
    }

    const handleSave = () => {
        batch.notes = notes
        batchService.updateBatch(batch)
        router.back()
    }

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 72 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 justify-between gap-4 p-4">
                    <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
                        <View className="w-12 h-12 rounded-full border border-brown-800 justify-center items-center">
                            <Ionicons
                                name="chevron-down"
                                size={20}
                                color={NativeWindColors.brown[800]}
                            />
                        </View>
                    </TouchableOpacity>

                    <Text className="text-brown-800 mt-4 mb-6 text-4xl font-extrabold">
                        {t('notes.editTitle')}
                    </Text>

                    <Textarea
                        onChangeText={setNotes}
                        value={notes}
                        placeholder={t('notes.placeholder')}
                    />

                    <View>
                        <TouchableOpacity
                            onPress={handleSave}
                            className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                        >
                            <Text className="text-white text-2xl font-semibold">
                                {t('notes.save')}
                            </Text>
                            <Ionicons
                                name="arrow-forward"
                                size={28}
                                color="white"
                                className="ml-2"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default NotesModal
