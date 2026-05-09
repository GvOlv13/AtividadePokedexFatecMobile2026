import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button from '@/components/button';
import Input from '@/components/input'
import Title from '@/components/title';
import { Image } from 'react-native';
import Alert from '@/components/alert/index'

export default function Index() {
    const [name, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    const { signIn } = useAuth();

    function handleLogin(){
        if(name.trim() == 'Vinicius' && senha.trim() == '123'){
            signIn(name)
            console.log("True")
            router.push('/pokedex');
        }else{
            setVisible(true);
        }

    }

    return(
        <View style={styles.screen}>
            <Alert
            title="Erro"
            message="Login inválido"
            visible={visible}
            onClose={() => setVisible(false)}
        />
            <View style={styles.logo} >
                <Image
                source={require('@/assets/images/pokedex-logo.png')}
                style={[{width: 338, height: 110 }]}
                />
            </View>
            <View style={styles.login}>
                <View style={styles.header}>
                    <Title>Welcome to Pokedex</Title>
                    <Text>Enter your trainer account to continue</Text>
                </View>

            <Input placeholder={"Usuario"} value={name} onChangeText={setNome} />

            <Input placeholder={"Senha"} value={senha} onChangeText={setSenha} />

            <Button title='Entrar' onPress={handleLogin} disable={!name || !senha}/>
            </View>
        </View>
    )

}
    const styles = StyleSheet.create({
        screen: {
            backgroundColor: '#bb263f',
            width: '100%',
            height: '100%',
            alignItems: 'center'
        },

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
            display: 'flex',
            alignItems: 'center',
        },

        logo:{
            height: '40%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }

    })