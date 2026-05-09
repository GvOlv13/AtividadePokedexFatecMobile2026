import { Platform } from 'react-native';

import AlertMobile from './index.android';
import AlertWeb from './index.web';

const Alert = Platform.select({
    android: AlertMobile,
    web: AlertWeb,
    default: AlertWeb
});

export default Alert;

