import {Path} from 'react-native-svg';
import {cssInterop} from 'nativewind';

export const StyledPath = cssInterop(Path, {
    className: {
        target: 'style',
        nativeStyleToProp: {fill: true, stroke: true},
    },
});
