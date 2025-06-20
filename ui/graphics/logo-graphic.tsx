import * as React from "react"
import Svg, {Defs, G, LinearGradient, Path, Rect, Stop} from "react-native-svg"

const LogoGraphic = () => (
    <Svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 638 836"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Rect
            x={30}
            y={168}
            width={578}
            height={622}
            rx={126}
            stroke="#372315"
            strokeWidth={16}
        />
        <G filter="url(#filter0_d_80_12)">
            <Path
                d="M322.563 363.423C200.413 326.562 86.4288 340.257 41.8193 348.159C30.0891 350.237 22 360.549 22 372.462V664C22 738.006 81.9938 798 156 798H482C556.006 798 616 738.006 616 664V360.448C616 350.745 610.022 344.975 600.648 347.48C557.838 358.919 434.694 397.26 322.563 363.423Z"
                fill="url(#paint0_linear_80_12)"
            />
            <Path
                d="M43.2148 356.037C87.2495 348.237 199.813 334.738 320.252 371.082C434.976 405.702 560.498 366.488 602.713 355.208C605.438 354.48 606.339 355.202 606.56 355.396C606.982 355.767 608 357.11 608 360.448V664C608 733.588 551.588 790 482 790H156C86.4121 790 30 733.588 30 664V372.462C30 364.159 35.565 357.392 43.2148 356.037Z"
                stroke="#372315"
                strokeWidth={16}
                strokeLinecap="round"
            />
        </G>
        <Path
            d="M124.592 217.655C86.6563 214.779 51.1179 201.932 37.1937 193.864C30.4596 189.963 37.1749 183.692 42.1658 177.72C62.0327 153.95 86.5518 125.855 86.5518 125.855C95.8191 114.974 96.4664 98.8634 92.4618 84.9384C86.2134 63.2117 86.0873 30.6446 129.147 10.3853C132.655 8.73461 136.679 8.00077 140.53 8.00077C334.706 8.00099 309.41 7.99971 497.142 8.00006C501.088 8.00007 505.202 8.76813 508.779 10.5002C550.995 30.9431 550.616 63.0309 544.136 84.6087C539.899 98.7159 540.456 115.159 549.925 126.182C549.925 126.182 572.958 153.377 594.574 178.283C599.49 183.948 606.86 189.491 600.504 193.474C590.846 199.526 571.841 207.763 571.841 207.763C562.766 213.89 551.264 214.548 541.32 210.111C520.641 200.884 483.819 186.554 455.781 187.182C417.417 188.041 400.335 216.049 361.993 217.655C317.939 219.501 297.022 188.93 252.965 187.182C201.58 185.143 180.865 221.922 124.592 217.655Z"
            fill="#FFC89E"
            stroke="#372315"
            strokeWidth={16}
            strokeLinecap="round"
        />
        <Path
            d="M536 108L102 108"
            stroke="#372315"
            strokeWidth={16}
            strokeLinecap="round"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_80_12"
                x1={319}
                y1={339}
                x2={319}
                y2={798}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#704A33" />
                <Stop offset={1} stopColor="#4F3422" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export default LogoGraphic
