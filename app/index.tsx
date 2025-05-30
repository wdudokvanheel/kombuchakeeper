import {Text, View} from "react-native";
import {Link} from "expo-router"

const Index = () =>
    <View className="bg-blue-800 flex-1 items-center justify-start">
        <Text className="text-amber-600 text-4xl top-2">Kombucha Keeper</Text>

        <Link href="/brew/new">A new brew</Link>
    </View>

export default Index;
