import {cssInterop} from 'nativewind';
import {Path} from 'react-native-svg';

export const StyledPath = cssInterop(Path, {
    className: {
        target: 'style',
        nativeStyleToProp: {fill: true, stroke: true},
    },
});
