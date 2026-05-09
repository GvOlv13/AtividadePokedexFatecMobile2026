import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/input';
import Button from '@/components/button';
import Title from '@/components/title';
import { loginProps } from './types';

export default function LoginBoxWeb({
    name,
    senha,
    setNome,
    setSenha,
    handleLogin
}: loginProps) {

    return (
        <View style={styles.container}>

            <View style={styles.login}>

                <View style={styles.header}>
                    <Title>Welcome to Pokedex</Title>

                    <Text>
                        Enter your trainer account to continue
                    </Text>
                </View>

                <Input
                    placeholder="Usuario"
                    value={name}
                    onChangeText={setNome}
                />

                <Input
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                />

                <Button
                    title='Entrar'
                    onPress={handleLogin}
                    disable={!name || !senha}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    login: {
        width: 420,
        backgroundColor: '#ffffff',
        padding: 40,
        borderRadius: 25,
        gap: 15,

        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10
    },

    header: {
        alignItems: 'center',
        marginBottom: 20
    }

});