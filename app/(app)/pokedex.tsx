import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
const { signOut } = useAuth();
    function HandleSignOut() {
        signOut();
        router.push('/');
    }

    return(
        <View>
            <Text>Logado</Text>
            <Button title="Sair" onPress={HandleSignOut} />
        </View>

    )
}