import { Platform } from "react-native";
import InputAndroid from './index.android'
import InputWeb from './index.web'

const Input = Platform.select({
    android: InputAndroid,
    web: InputWeb,
    default: InputWeb
});

export default Input