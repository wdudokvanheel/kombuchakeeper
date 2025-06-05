import NewBrewHeader from "@/app/brew/new-brew-header";
import {Brew} from "@/models/brew"
import {BrewService} from "@/services/brew-service"
import ThemedTextInput from "@/ui/components/themed-textinput"
import Ionicons from "@expo/vector-icons/Ionicons";
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
        <>
            <NewBrewHeader/>

            <View className="flex-1 justify-between px-4 pt-4">
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-brown-900 mb-2">
                        Brew name
                    </Text>

                    <ThemedTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Unnamed brew"
                    />

                    <Text className="text-lg font-semibold text-gray-700 mb-2">
                        First fermentation duration
                    </Text>
                    <ThemedTextInput
                        value={days}
                        onChangeText={setDays}
                        placeholder="Number of days"
                    />
                </View>

                <View>
                    <TouchableOpacity
                        onPress={saveBrew}
                        className="bg-brown-800 rounded-[64px] py-4 px-6 flex-row items-center justify-center"
                    >
                        <Text className="text-white text-xl font-semibold">Add brew</Text>
                        <Ionicons name="add" size={24} color="white" className="ml-2" />
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
};

export default NewBrew;
