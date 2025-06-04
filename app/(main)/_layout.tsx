import {Slot, useRouter} from "expo-router";
import {View} from "react-native";
import MenuBar from "@/app/(main)/menubar"
import AppHeader from "@/app/(main)/header"
import {Brew, BrewState} from "@/models/brew"
import {BrewService} from "@/services/brew-service"

const MainLayout = () => {
    const router = useRouter()

    return (
        <>
            <AppHeader radius={50}/>

            <View className="flex-1 mt-4">
                <Slot/>
            </View>

            <View className="mx-0">
                <MenuBar
                    height={100}
                    dipWidth={160}
                    cornerRadius={80}
                    onPress={() =>
                        BrewService.addBrew(new Brew({
                            name: 'Test',
                            createdAt: new Date(),
                            state: BrewState.Bottled,
                            firstFermentationEnd: new Date(),
                            secondFermentationEnd: new Date(),
                            notes: 'Test'
                        }))
                        // router.push("/brew/new")

                    }
                />
            </View>
        </>
    )
}

export default MainLayout;
