import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, Image, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { isAuthenticated, isLoading, signOut } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  function logout(){
    signOut();
  }

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  const baseHeight = Platform.OS === 'ios' ? 85 : 65;
  const safeBottom = Math.max(insets.bottom, 10);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#bb263f',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View>
            <Image
              source={require('@/assets/images/pokedex-logo.png')}
              style={{ width: 130, height: 40 }}
              resizeMode="contain"
            />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: Platform.OS === 'web' ? 70 : baseHeight + (Platform.OS === 'android' ? safeBottom : 0),
          paddingBottom: Platform.OS === 'web' ? 10 : (Platform.OS === 'ios' ? 25 : safeBottom),
          paddingTop: 10,
          ...(Platform.OS === 'web' && {
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: [{ translateX: '-50%' }],
            width: Math.min(screenWidth * 0.9, 600),
            borderRadius: 30,
            height: 70,
            paddingBottom: 10,
          })
        },
        tabBarActiveTintColor: '#bb263f',
        tabBarInactiveTintColor: '#a0a0a0',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
        }
      }}
    >
      <Tabs.Screen
        name="pokedex"
        options={{
          title: 'Pokédex',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "apps" : "apps-outline"} size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'My Team',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "shield-half" : "shield-half-outline"} size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size + 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}