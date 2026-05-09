import { Platform } from "react-native";
import loginBoxAndroid from './index.android'
import LoginBoxWeb from "./index.android";


const LoginBox = Platform.select({
    android: loginBoxAndroid,
    web: LoginBoxWeb,
    default: loginBoxAndroid
});

export default LoginBox