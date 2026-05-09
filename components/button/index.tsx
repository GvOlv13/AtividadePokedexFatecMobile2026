import { Platform } from 'react-native';

import ButtonAndroid from './index.android';
import ButtonWeb from './index.web';

const Button = Platform.select({
    android: ButtonAndroid,
    web: ButtonWeb,
    default: ButtonWeb
});

export default Button;