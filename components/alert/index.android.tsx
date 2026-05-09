import { useEffect } from 'react';
import { Alert } from 'react-native';
import { AlertProps } from './types';

export default function AlertMobile({
    title,
    message,
    visible,
    onClose
}: AlertProps) {

    useEffect(() => {
        if (visible) {
            Alert.alert(title, message, [
                { text: 'OK', onPress: onClose }
            ]);
        }
    }, [visible]);

    return null;
}