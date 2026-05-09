import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button from '@/components/button';
import Input from '@/components/input'
import Title from '@/components/title';
import { Image } from 'react-native';
import Alert from '@/components/alert/index'
import LoginBox from '@/components/loginBox';

export default function Index() {
    const [name, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    const { signIn } = useAuth();

    function handleLogin(){
        if(name.trim() == 'kleber' && senha.trim() == '123'){
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
  
                <LoginBox name={name} senha={senha} setNome={setNome} setSenha={setSenha} handleLogin={handleLogin}/>

            

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

        
        logo:{
            height: '40%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },

    })