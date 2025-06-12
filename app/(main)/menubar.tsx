import {StyledPath} from "@/ui/svg";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useCallback, useState} from "react";
import {LayoutChangeEvent, TouchableOpacity, View} from "react-native";
import Svg, {Defs, FeDropShadow, Filter} from "react-native-svg";

type MenuBarWithButtonProps = {
    /** Explicit width. Leave undefined to make it fill its parent */
    width?: number;
    /** Fixed height (stays constant even when width changes) */
    height?: number;
    cornerRadius?: number;
    /** Depth of the dip measured from the top‑edge downwards */
    dipDepth?: number;
    /** Width of the dip (can be >50% of overall width) */
    dipWidth?: number;
    /** Callback for button press */
    onPress?: () => void;
    /** Optional additional button styling */
    buttonStyle?: object;
}

const MenuBar: React.FC<MenuBarWithButtonProps> = ({
                                                       width,
                                                       height = 80,
                                                       cornerRadius = 120,
                                                       dipDepth = 38,
                                                       dipWidth = 120,
                                                       onPress,
                                                       buttonStyle,
                                                   }) => {
    const [measuredWidth, setMeasuredWidth] = useState<number | undefined>(width);

    const onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            if (width === undefined) {
                const w = Math.ceil(e.nativeEvent.layout.width);
                if (w !== measuredWidth) {
                    setMeasuredWidth(w)
                }
            }
        },
        [width, measuredWidth]
    );

    if (measuredWidth === undefined) {
        return <View onLayout={onLayout}/>;
    }

    /* Calculate button geometry */
    const effectiveDipWidth = Math.min(dipWidth, measuredWidth);
    const buttonDiameter = effectiveDipWidth * 0.375;
    const buttonRadius = buttonDiameter / 2;

    const buttonLeft = (measuredWidth - buttonDiameter) / 2;
    const buttonTop = -buttonDiameter / 2;

    return (
        <View
            onLayout={onLayout}
            className="relative"
        >
            <MenuBarShape
                width={measuredWidth}
                height={height}
                cornerRadius={cornerRadius}
                dipDepth={dipDepth}
                dipWidth={dipWidth}
            />

            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                className="absolute items-center justify-center bg-green-500 shadow-md shadow-green-500"
                style={[
                    {
                        width: buttonDiameter,
                        height: buttonDiameter,
                        borderRadius: buttonRadius,
                        left: buttonLeft,
                        top: buttonTop,
                        elevation: 10,
                    },
                    buttonStyle,
                ]}
            >
                <Ionicons name="add-outline" size={40} color="white"/>
            </TouchableOpacity>
        </View>
    );
};

export default MenuBar;

type ShapeProps = {
    /** Explicit width. Leave undefined to make it fill its parent */
    width?: number;
    /** Fixed height (stays constant even when width changes) */
    height?: number;
    cornerRadius?: number;
    /** Depth of the dip measured from the top-edge downwards */
    dipDepth?: number;
    /** Width of the dip (can be >50 % of overall width) */
    dipWidth?: number;
};

const MenuBarShape: React.FC<ShapeProps> = ({
                                                width,
                                                height = 100,
                                                cornerRadius = 40,
                                                dipDepth = 38,
                                                dipWidth = 120,
                                            }) => {
    const [measuredWidth, setMeasuredWidth] = useState<number | undefined>(width)

    const onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            if (width === undefined) {
                const w = Math.ceil(e.nativeEvent.layout.width);
                if (w !== measuredWidth) {
                    setMeasuredWidth(w)
                }
            }
        },
        [width, measuredWidth],
    );

    if (measuredWidth === undefined) {
        return <View onLayout={onLayout}/>;
    }

    const w = measuredWidth;
    const h = height;
    const r = Math.min(cornerRadius, h / 2);
    const dw = Math.min(dipWidth, w - 2 * r);

    const leftFlatEnd = w / 2 - dw / 2;
    const rightFlatStart = w / 2 + dw / 2;
    const cp = dw * 0.25;
    const pathData = `
        M ${r} 10
        H ${leftFlatEnd}
        C ${leftFlatEnd + cp} 10, ${w / 2 - cp} ${dipDepth}, ${w / 2} ${dipDepth}
        C ${w / 2 + cp} ${dipDepth}, ${rightFlatStart - cp} 10, ${rightFlatStart} 10
        H ${w - r}
        A ${r} ${r} 0 0 1 ${w} ${r}
        V ${h}
        H 0
        V ${r}
        A ${r} ${r} 0 0 1 ${r} 10
        Z
  `;

    return (
        <View onLayout={onLayout} className="overflow-visible">
            <Svg
                width={w}
                height={h}
                viewBox={`0 0 ${w} ${h}`}
            >
                <Defs>
                    <Filter
                        id="topShadow"
                        y="-25%"
                        height="150%"
                    >
                        <FeDropShadow
                            dx={0}
                            dy={-4}
                            stdDeviation={4}
                            floodColor="#000"
                            floodOpacity={0.05}
                        />
                    </Filter>
                </Defs>

                <StyledPath
                    d={pathData}
                    className="fill-white"
                    filter="url(#topShadow)"
                />
            </Svg>
        </View>
    );
};