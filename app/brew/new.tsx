import {Brew} from "@/models/brew"
import {BrewService} from "@/services/brew-service"
import ThemedTextInput from "@/ui/components/themed-textinput"
import {useRouter} from "expo-router"
import React, {useState} from "react"
import {Text, TouchableOpacity, View} from "react-native"

const NewBrew: React.FC = () => {
    const [name, setName] = useState("");
    const [days, setDays] = useState("");
    const router = useRouter();

    const saveBrew = () => {
        const parsedDays = parseInt(days, 10) || 10
        const firstFermentationEnd = new Date()
        firstFermentationEnd.setDate(firstFermentationEnd.getDate() + parsedDays)

        let brew = new Brew({
            name: name,
            firstFermentationEnd: firstFermentationEnd
        });

        BrewService.addBrew(brew).then(() => router.push("/"))
    };

    return (
        <View className="flex-1 justify-between">
            <View className="flex-1">
                <Text className="text-lg font-semibold text-brown-900 mb-2">
                    Brew Name
                </Text>

                <ThemedTextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Unnamed brew"
                />

                <Text className="text-lg font-semibold text-gray-700 mb-2">
                    First Fermentation duration
                </Text>
                <ThemedTextInput
                    value={days}
                    onChangeText={setDays}
                    placeholder="Number of days"
                />
            </View>

            <TouchableOpacity
                onPress={saveBrew}
                className="bg-green-600 rounded-[64px] py-4 items-center"
            >
                <Text className="text-white text-xl font-semibold">Add Brew</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NewBrew;
