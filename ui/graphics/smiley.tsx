import {NativeWindColors} from "@/ui/nativewind"
import Svg, {Circle, G, Path} from 'react-native-svg'

// export const enum SmileyVariant {
//     SuperSad = 'SuperSad',
//     Sad = 'sad',
//     Neutral = 'neutral',
//     Happy = 'happy',
//     Perfect = 'perfect'
// }

export const enum SmileyVariant {
    Sad = 'sad',
    Neutral = 'neutral',
    Happy = 'happy'
}

export const SmileyColors = {
    [SmileyVariant.Happy]: {
        head: NativeWindColors.green[500],
        face: NativeWindColors.green[900],
        border: NativeWindColors.green[200]
    },
    [SmileyVariant.Neutral]: {
        head: NativeWindColors.brown[400],
        face: NativeWindColors.brown[900],
        border: NativeWindColors.brown[200]
    },
    [SmileyVariant.Sad]: {
        head: NativeWindColors.purple[300],
        face: NativeWindColors.purple[900],
        border: NativeWindColors.purple[200]
    }
}

type SmileyProps = {
    variant: SmileyVariant
    shaded?: boolean
    size?: number
}

const Smiley = ({variant, size = 256, shaded = false}: SmileyProps) => {
    let {head: colorHead, face: colorFace} = SmileyColors[variant]

    if (shaded) {
        colorHead = NativeWindColors.gray[300]
        colorFace = NativeWindColors.green[800]
    }

    let mouth = ''

    switch (variant) {
        case SmileyVariant.Happy: {
            mouth = 'M186.2 167V167C166.212 219.237 92.8879 220.821 70.664 169.495L70.0002 167.962'
            break
        }
        case SmileyVariant.Sad: {
            mouth = 'M69.8048 191.998V191.998C90.2421 139.935 163.577 138.984 185.358 190.5L186.008 192.038'
            break
        }
        default: {
            mouth = 'M70 168L186 169'
        }
    }

    return (
        <Svg width={size} height={size} viewBox="0 0 256 256">
            <G clipPath="url(#clip0)">
                <Circle cx="128" cy="128" r="128" fill={colorHead}/>
                <Path d="M70 70L70 103" stroke={colorFace} strokeWidth="24" strokeLinecap="round"/>
                <Path d="M186 70L186 103" stroke={colorFace} strokeWidth="24" strokeLinecap="round"/>
                <Path
                    d={mouth}
                    fill={colorHead}
                    stroke={colorFace}
                    strokeWidth="24"
                    strokeLinecap="round"
                />
            </G>
        </Svg>
    )
}

export default Smiley