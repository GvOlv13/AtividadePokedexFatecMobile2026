import { View, Text, Button, StyleSheet } from 'react-native';
import { AlertProps } from './types';

export default function AlertWeb({
    title,
    message,
    visible,
    onClose
}: AlertProps) {

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.alertBox}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.message}>
                    {message}
                </Text>

                <View style={styles.button}>
                    <Button title="Fechar" onPress={onClose} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },

    alertBox: {
        width: 320,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        gap: 15,
        elevation: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
    },

    message: {
        fontSize: 16,
        color: '#555',
    },

    button: {
        marginTop: 10,
    }
});