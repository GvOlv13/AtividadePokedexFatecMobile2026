import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function Index() {
    const [name, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const { signIn } = useAuth();

    function handleLogin(){
        if(name == 'Vinicius' && senha == '123'){
            signIn(name)
            console.log("True")
            router.push('/pokedex');
        }else{
           console.log("false," + name +" | "+ senha) 
        }

    }

    return(
        <View style={styles.screen}>

            <View style={styles.login}>

    
         <TextInput
                placeholder="Usuário"
                value={name}
                onChangeText={setNome}
            />

         <TextInput
                placeholder="Usuário"
                value={senha}
                onChangeText={setSenha}
            />

            <Button title='Entrar' onPress={handleLogin}  />
            </View>
        </View>
    )

}
    const styles = StyleSheet.create({
        screen: {
            backgroundColor: '#dc0a2d',
            width: '100%',
            height: '100%',
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
        }

    })