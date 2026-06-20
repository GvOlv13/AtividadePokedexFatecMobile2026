import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import Button from '@/components/button';
import Input from '@/components/input';
import Title from '@/components/title';
import Alert from '@/components/alert/index';

export default function Register() {
    const [name, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmSenha, setConfirmSenha] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { register } = useAuth();

    async function handleRegister(){
        if(!name.trim() || !senha.trim() || !confirmSenha.trim()) {
            setErrorMessage('Preencha todos os campos!');
            setVisible(true);
            return;
        }

        if(senha.trim() !== confirmSenha.trim()) {
            setErrorMessage('As senhas não coincidem!');
            setVisible(true);
            return;
        }

        try {
            await register(name.trim(), senha.trim());
            router.push('/pokedex');
        } catch(e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                setErrorMessage(e.response.data.message);
            } else {
                setErrorMessage('Não foi possível criar a conta. Tente novamente.');
            }
            setVisible(true);
        }
    }

    return(
        <View style={styles.screen}>
            <Alert
                title="Erro"
                message={errorMessage}
                visible={visible}
                onClose={() => setVisible(false)}
            />
            <View style={styles.logoContainer} >
                <Image
                    source={require('@/assets/images/pokedex-logo.png')}
                    style={[{width: 338, height: 110 }]}
                />
            </View>
            
            <View style={styles.formContainer}>
                <View style={styles.formHeader}>
                    <Title>Crie sua conta</Title>
                    <Text>Junte-se à Pokedex agora</Text>
                </View>

                <Input placeholder="Usuario" value={name} onChangeText={setNome} />
                <Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} />
                <Input placeholder="Confirmar Senha" value={confirmSenha} onChangeText={setConfirmSenha} secureTextEntry={true} />

                <Button title='Cadastrar' onPress={handleRegister} disable={!name || !senha || !confirmSenha} />

                <TouchableOpacity onPress={() => router.push('/')} style={styles.linkButton}>
                    <Text style={styles.linkText}>Já possui uma conta? Faça Login!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#bb263f',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
    },
    logoContainer:{
        height: Platform.OS === 'web' ? 'auto' : '35%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'web' ? 40 : 0,
        marginTop: Platform.OS === 'web' ? 0 : 50,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: 40,
        gap: 15,
        ...Platform.select({
            web: {
                width: 420,
                borderRadius: 25,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 10,
            },
            default: {
                width: '100%',
                height: '75%',
                position: 'absolute',
                bottom: 0,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
            }
        })
    },
    formHeader: {
        alignItems: 'center',
        marginBottom: 20
    },
    linkButton: {
        alignItems: 'center',
        marginTop: 10
    },
    linkText: {
        color: '#1d6ba0',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});
