import {Batch} from "@/models/batch"
import Text from "@/ui/components/text"
import {NativeWindColors} from "@/ui/nativewind"
import Ionicons from "@expo/vector-icons/Ionicons"
import {TouchableOpacity, View} from "react-native"
import {useTranslation} from 'react-i18next'

type NotesPanelProps = {
    batch: Batch
    onEdit: () => void
}

const NotesPanel = ({batch, onEdit}: NotesPanelProps) => {
    const {t} = useTranslation()
    const isEmpty = batch.notes == undefined || batch.notes.trim().length == 0

    return (
        <TouchableOpacity
            onPress={onEdit}
            className="p-4 flex-1 bg-brown-100 rounded-[2rem]"
        >
            {
                isEmpty &&
                <View className="m-auto flex-row">
                    <Ionicons name="add-circle" size={24} color={NativeWindColors.green[500]}/>
                    <Text className="text-xl ml-2">{t('batchDetail.addNote')}</Text>
                </View>
            }
            {
                !isEmpty &&
                <Text className="text-xl">
                    {batch.notes || ""}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default NotesPanel
