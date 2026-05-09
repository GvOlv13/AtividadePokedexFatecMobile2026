import { View, Text, StyleSheet, Platform } from 'react-native';
import Input from '@/components/input';
import Button from '@/components/button';
import Title from '@/components/title';
import { loginProps } from './types';

export default function LoginBoxAndroid({
    name,
    senha,
    setNome,
    setSenha,
    handleLogin
}: loginProps) {

    return (
        <View style={styles.login}>
            <View style={styles.header}>
                <Title>Welcome to Pokedex</Title>
                <Text>Enter your trainer account to continue</Text>
            </View>

            <Input placeholder={"Usuario"} value={name} onChangeText={setNome} />

            <Input placeholder={"Senha"} value={senha} onChangeText={setSenha} />

            <Button title='Entrar' onPress={handleLogin} disable={!name || !senha} />
        </View>
    );
}

const styles = StyleSheet.create({
    login: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '60%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 40,
        gap: 15
    },

    header: {
        alignItems: 'center',
        marginBottom: 20
    }
});