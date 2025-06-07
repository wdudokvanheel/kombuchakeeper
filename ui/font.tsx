import {
    Urbanist_100Thin,
    Urbanist_100Thin_Italic,
    Urbanist_200ExtraLight,
    Urbanist_200ExtraLight_Italic,
    Urbanist_300Light,
    Urbanist_300Light_Italic,
    Urbanist_400Regular,
    Urbanist_400Regular_Italic,
    Urbanist_500Medium,
    Urbanist_500Medium_Italic,
    Urbanist_600SemiBold,
    Urbanist_600SemiBold_Italic,
    Urbanist_700Bold,
    Urbanist_700Bold_Italic,
    Urbanist_800ExtraBold,
    Urbanist_800ExtraBold_Italic,
    Urbanist_900Black,
    Urbanist_900Black_Italic
} from "@expo-google-fonts/urbanist";
import {useFonts} from "expo-font";
import {Platform} from "react-native";

/**
 * Load the Urbanist font and patch the Text element to automatically add the font-family to each instance of Text
 */
const useUrbanistFont = (): boolean => {
    if (Platform.OS !== 'ios') {
        return true
    }

    const [fontsLoaded] = useFonts({
        Urbanist: Urbanist_400Regular,        // base (400)
        'Urbanist-Thin': Urbanist_100Thin,    // 100
        'Urbanist-ExtraLight': Urbanist_200ExtraLight, // 200
        'Urbanist-Light': Urbanist_300Light,  // 300
        'Urbanist-Medium': Urbanist_500Medium,// 500
        'Urbanist-SemiBold': Urbanist_600SemiBold,// 600
        'Urbanist-Bold': Urbanist_700Bold,    // 700
        'Urbanist-ExtraBold': Urbanist_800ExtraBold,// 800
        'Urbanist-Black': Urbanist_900Black,  // 900
        'Urbanist-Italic': Urbanist_400Regular_Italic,
        'Urbanist-ThinItalic': Urbanist_100Thin_Italic,
        'Urbanist-ExtraLightItalic': Urbanist_200ExtraLight_Italic,
        'Urbanist-LightItalic': Urbanist_300Light_Italic,
        'Urbanist-MediumItalic': Urbanist_500Medium_Italic,
        'Urbanist-SemiBoldItalic': Urbanist_600SemiBold_Italic,
        'Urbanist-BoldItalic': Urbanist_700Bold_Italic,
        'Urbanist-ExtraBoldItalic': Urbanist_800ExtraBold_Italic,
        'Urbanist-BlackItalic': Urbanist_900Black_Italic,
    });

    return fontsLoaded

    // const defaultStyle = {fontFamily: 'Urbanist'};
    // const _render = Text.render.bind(Text);
    // Text.render = (...args) => {
    //     const origin = _render(...args)
    //     return {
    //         ...origin,
    //         props: {
    //             ...origin.props,
    //             style: [defaultStyle, origin.props.style],
    //         },
    //     }
    // }
}

export default useUrbanistFont;