import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Text, Image, View } from 'react-native';
import Button from "@/components/button";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const {signOut} = useAuth();

  function logout(){
    signOut();
  }

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

return (
    <Stack
        screenOptions={{
            headerShown: true,
            headerTitle: () => (
                <View>
                <Image
                source={require('@/assets/images/pokedex-logo.png')}
                style={[{width: 130, height: 40 }]}
                />

                </View>
           ),
           headerRight: () => (
          <Button disable={false} title="Sair" onPress={logout} />
          ),

            headerStyle: {
                backgroundColor: '#bb263f',
            },

            headerTintColor: '#fff',

            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
            }, 

            headerTitleAlign: 'center',
            
        }}
    />
);
}