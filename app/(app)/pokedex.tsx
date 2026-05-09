import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/card';
import PokemonModal from '@/components/PokemonModal';

interface Pokemon {
    id: number;
    name: string;
    img: any; 
    type: string[];
}

export default function Index() {
    const [visible, setVisible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const { signOut } = useAuth();
    function HandleSignOut() {
        signOut();
        router.push('/');
    }

const pokemons = [
    {
        id: 1,
        name: 'Pikachu',
        img: require('@/assets/pokemon/Pikachu.png'),
        type: ['ELECTRIC'],
    },

    {
        id: 4,
        name: 'Charmander',
        img: require('@/assets/pokemon/Charmander.png'),
        type: ['FIRE'],
    },

    {
        id: 7,
        name: 'Squirtle',
        img: require('@/assets/pokemon/Squirtle.png'),
        type: ['WATER'],
    },

    {
        id: 1,
        name: 'Bulbasaur',
        img: require('@/assets/pokemon/Bulbassaur.png'),
        type: ['GRASS', 'POISON'],
    },

    {
        id: 10,
        name: 'Caterpie',
        img: require('@/assets/pokemon/Carterpie.png'),
        type: ['BUG'],
    },

    {
        id: 150,
        name: 'Mewtwo',
        img: require('@/assets/pokemon/Mewtwo.png'),
        type: ['PSYCHIC'],
    },

];

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = 220;
    const columns =
        Platform.OS === 'web'
            ? Math.floor(screenWidth / cardWidth)
            : 2;


    return (
        <View style={styles.list}>
            <PokemonModal
                visible={visible}
                pokemon={selectedPokemon}
                onClose={() => setVisible(false)}
            />
            <FlatList
                data={pokemons}
                key={columns}
                numColumns={columns}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{
                    gap: 20,
                    marginBottom: 20,
                }}
                contentContainerStyle={{
                    padding: 20,
                }}
                renderItem={({ item }) => (
                    <Card
                        id={item.id}
                        name={item.name}
                        img={item.img}
                        type={item.type}
                        onPress={() => {
                        setSelectedPokemon(item);
                        setVisible(true);
                    }}
                    />
                )}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    }
})