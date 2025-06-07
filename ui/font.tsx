import * as U from "@expo-google-fonts/urbanist";
import {useFonts} from "expo-font";

/**
 * Load the Urbanist font and patch the Text element to automatically add the font-family to each instance of Text
 */
const asUrbanist = (src: FontSource, w: number, italic = false): FontSource => ({
    ...src,
    family: "Urbanist",
    weight: w,
    style: italic ? "italic" : "normal"
})

const useUrbanistFont = (): boolean => {
    const [loaded] = useFonts({
        Urbanist_100Thin: U.Urbanist_100Thin,
        Urbanist_100Thin_Italic: U.Urbanist_100Thin_Italic,
        Urbanist_200ExtraLight: U.Urbanist_200ExtraLight,
        Urbanist_200ExtraLight_Italic: U.Urbanist_200ExtraLight_Italic,
        Urbanist_300Light: U.Urbanist_300Light,
        Urbanist_300Light_Italic: U.Urbanist_300Light_Italic,
        Urbanist_400Regular: U.Urbanist_400Regular,
        Urbanist_400Regular_Italic: U.Urbanist_400Regular_Italic,
        Urbanist_500Medium: U.Urbanist_500Medium,
        Urbanist_500Medium_Italic: U.Urbanist_500Medium_Italic,
        Urbanist_600SemiBold: U.Urbanist_600SemiBold,
        Urbanist_600SemiBold_Italic: U.Urbanist_600SemiBold_Italic,
        Urbanist_700Bold: U.Urbanist_700Bold,
        Urbanist_700Bold_Italic: U.Urbanist_700Bold_Italic,
        Urbanist_800ExtraBold: U.Urbanist_800ExtraBold,
        Urbanist_800ExtraBold_Italic: U.Urbanist_800ExtraBold_Italic,
        Urbanist_900Black: U.Urbanist_900Black,
        Urbanist_900Black_Italic: U.Urbanist_900Black_Italic
    })

    return loaded
}

export default useUrbanistFont