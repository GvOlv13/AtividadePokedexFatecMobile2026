import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Platform,
    Dimensions,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';

import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import Card from '@/components/card';
import PokemonModal from '@/components/PokemonModal';

import { getPokemons } from '@/integration/pokemonIntegration';
import { Pokemon } from '@/@types/Pokemon';

export default function Index() {
    const [visible, setVisible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    const { signOut } = useAuth();

    function HandleSignOut() {
        signOut();
        router.push('/');
    }

    async function loadPokemons() {
        try {
            const data = await getPokemons();
            setPokemons(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPokemons();
    }, []);

    const { width: screenWidth } = useWindowDimensions();
    const isMobileSize = screenWidth < 600;
    
    const gap = 15;
    const desktopCardWidth = 220;
    
    const maxContainerWidth = Math.min(screenWidth, 1200);
    const availableWidth = maxContainerWidth - 30; // 30 is horizontal padding inside contentContainerStyle

    const columns = isMobileSize
        ? 2
        : Math.max(Math.floor((availableWidth + gap) / (desktopCardWidth + gap)), 1);
        
    // Calculate the exact width the grid needs so we can center it properly on large screens
    const gridContentWidth = isMobileSize 
        ? '100%' 
        : (columns * desktopCardWidth) + ((columns - 1) * gap);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.list}>
            <View style={styles.wrapper}>
                <PokemonModal
                    visible={visible}
                    pokemon={selectedPokemon}
                    onClose={() => setVisible(false)}
                />

                <FlatList
                    data={pokemons}
                    key={columns} // Forces re-render when columns change
                    numColumns={columns}
                    keyExtractor={(item) => item.index}
                    contentContainerStyle={{
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        alignItems: isMobileSize ? 'stretch' : 'center', 
                        paddingBottom: Platform.OS === 'web' ? 100 : 30,
                    }}
                    columnWrapperStyle={{
                        width: isMobileSize ? '100%' : gridContentWidth,
                        justifyContent: isMobileSize ? 'space-between' : 'flex-start',
                        gap: isMobileSize ? 0 : gap, // Native gap only on web
                        marginBottom: gap,
                    }}
                    renderItem={({ item }) => (
                        <Card
                            id={Number(item.index)}
                            name={item.nome}
                            img={{ uri: item.imagem }}
                            type={item.tipos}
                            width={isMobileSize ? undefined : desktopCardWidth}
                            onPress={() => {
                                setSelectedPokemon(item);
                                setVisible(true);
                            }}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },
    wrapper: {
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F6F8',
    },
});
