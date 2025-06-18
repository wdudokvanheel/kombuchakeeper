import {NativeWindColors} from "@/ui/nativewind"
import Svg, {Circle, Path} from "react-native-svg"

export const enum SmileyVariant {
    SuperSad = "SuperSad",
    Sad = "sad",
    Neutral = "neutral",
    Happy = "happy",
    Perfect = "perfect",
}

export const SmileyColors = {
    [SmileyVariant.SuperSad]: {
        head: NativeWindColors.purple[300],
        face: NativeWindColors.purple[900],
        border: NativeWindColors.purple[200],
    },
    [SmileyVariant.Sad]: {
        head: NativeWindColors.orange[400],
        face: NativeWindColors.orange[900],
        border: NativeWindColors.orange[200],
    },
    [SmileyVariant.Neutral]: {
        head: NativeWindColors.brown[400],
        face: NativeWindColors.brown[900],
        border: NativeWindColors.brown[300],
    },
    [SmileyVariant.Happy]: {
        head: NativeWindColors.yellow[500],
        face: NativeWindColors.yellow[900],
        border: NativeWindColors.yellow[300],
    },
    [SmileyVariant.Perfect]: {
        head: NativeWindColors.green[500],
        face: NativeWindColors.green[900],
        border: NativeWindColors.green[300],
    },
}

export type SmileyProps = {
    variant: SmileyVariant
    shaded?: boolean
    size?: number
}

const Smiley = ({variant, size = 256, shaded = false}: SmileyProps) => {
    let {head: colorHead, face: colorFace} = SmileyColors[variant]

    if (shaded) {
        colorHead = NativeWindColors.gray[300]
        colorFace = NativeWindColors.gray[800]
    }

    let mouth = ""
    let eyes: React.ReactNode = null

    switch (variant) {
        case SmileyVariant.SuperSad: {
            mouth =
                "M69.8048 191.998C90.2421 139.935 163.577 138.984 185.358 190.5L186.008 192.038"
            eyes = (
                <>
                    <Path d="M85.9084 70.5938L54.0886 102.414" stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
                    <Path d="M54.0886 70.5869L85.9084 102.407" stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
                    <Path d="M201.908 70.5938L170.089 102.414" stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
                    <Path d="M170.089 70.5869L201.908 102.407" stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
                </>
            )
            break
        }
        case SmileyVariant.Sad: {
            mouth =
                "M69.8048 191.998C90.2421 139.935 163.577 138.984 185.358 190.5L186.008 192.038"
            break
        }
        case SmileyVariant.Happy: {
            mouth =
                "M186.2 167C166.212 219.237 92.8879 220.821 70.664 169.495L70.0002 167.962"
            break
        }
        case SmileyVariant.Perfect: {
            mouth =
                "M186.2 167C166.212 219.237 92.8879 220.821 70.664 169.495L70.0002 167.962"
            eyes = (
                <>
                    <Path d="M47 104.5C51.2226 79.0709 87.7774 79.0709 92 104.5" stroke={colorFace} fill={colorHead} strokeWidth="24" strokeLinecap="round" />
                    <Path d="M163 104.5C167.223 79.0709 203.777 79.0709 208 104.5" stroke={colorFace} fill={colorHead} strokeWidth="24" strokeLinecap="round" />
                </>
            )
            break
        }
        default: {
            mouth = "M70 168L186 169"
        }
    }

    if (!eyes) {
        eyes = (
            <>
                <Path d="M70 70L70 103" stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
                <Path d="M186 70L186 103" stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
            </>
        )
    }

    return (
        <Svg width={size} height={size} viewBox="0 0 256 256">
            <Circle cx="128" cy="128" r="128" fill={colorHead} />
            {eyes}
            <Path d={mouth} fill={colorHead} stroke={colorFace} strokeWidth="24" strokeLinecap="round" />
        </Svg>
    )
}

export default Smiley
