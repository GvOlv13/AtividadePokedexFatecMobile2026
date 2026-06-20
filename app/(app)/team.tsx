import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, Platform, useWindowDimensions, Modal } from 'react-native';
import { getPokemonDetails } from '@/integration/pokemonIntegration';
import { apiIntegration } from '@/integration/api';
import { Pokemon } from '@/@types/Pokemon';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function TeamScreen() {
    const { user } = useAuth();
    const [ownedPokemons, setOwnedPokemons] = useState<Pokemon[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [catching, setCatching] = useState(false);
    const [caughtPokemon, setCaughtPokemon] = useState<Pokemon | null>(null);
    const [pokemonToSwapIn, setPokemonToSwapIn] = useState<Pokemon | null>(null);

    const { width: screenWidth } = useWindowDimensions();
    const availableWidth = Math.min(screenWidth, 1000) - 30; // 30 is padding
    const isMobileSize = screenWidth < 600;
    
    const gap = 15;
    const desktopCardWidth = 100;
    const columns = isMobileSize 
        ? 3 
        : Math.max(Math.floor((availableWidth + gap) / (desktopCardWidth + gap)), 3);

    useEffect(() => {
        if (user) {
            loadUserData();
        }
    }, [user]);

    async function loadUserData() {
        if (!user) return;
        try {
            const data = await apiIntegration.getTeamAndCaptured(user.id);
            setOwnedPokemons(data.capture);
            setSelectedTeam(data.team);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const toggleSelection = (pokemon: Pokemon) => {
        if (!user) return;
        
        const isSelected = selectedTeam.some(p => p.index === pokemon.index);
        
        if (isSelected) {
            Alert.alert("Aviso", "Este Pokémon já está no seu time ativo!");
        } else {
            // Open swap modal
            setPokemonToSwapIn(pokemon);
        }
    };

    const executeSwap = async (removedPokemon: Pokemon, newPokemon: Pokemon) => {
        if (!user) return;
        try {
            await apiIntegration.swapTeamPokemon(user.id, removedPokemon.index, newPokemon.index);
            setPokemonToSwapIn(null);
            loadUserData();
        } catch(e) {
            console.log(e);
            Alert.alert("Erro", "Não foi possível trocar o Pokémon.");
        }
    };

    const handleCatchPokemon = async () => {
        if (!user) return;
        setCatching(true);
        try {
            // Sorteia de 1 a 151
            const randomId = Math.floor(Math.random() * 151) + 1;
            const newPokemon = await getPokemonDetails(randomId);
            await apiIntegration.capturePokemon(user.id, newPokemon.index);
            setCaughtPokemon(newPokemon);
            loadUserData(); // Refresh list
        } catch(e) {
            Alert.alert("Erro", "Falha ao capturar Pokémon.");
        } finally {
            setCatching(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#bb263f" />
                <Text style={{ marginTop: 10 }}>Loading your Pokémon...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.teamSection}>
                    <Text style={styles.sectionTitle}>
                        My Team ({selectedTeam.length}/5)
                    </Text>
                    
                    {selectedTeam.length === 0 ? (
                        <View style={styles.emptyTeamContainer}>
                            <Text style={styles.emptyTeamText}>Select Pokémon below to build your team!</Text>
                        </View>
                    ) : (
                        <View style={styles.selectedContainer}>
                            {selectedTeam.map(pokemon => (
                                <TouchableOpacity 
                                    key={pokemon.index} 
                                    style={styles.selectedCard}
                                    onPress={() => Alert.alert("Dica", "Para trocar um Pokémon, selecione um novo Pokémon na lista abaixo.")}
                                >
                                    <Image source={{ uri: pokemon.imagem }} style={styles.selectedImage} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.listSection}>
                    <View style={styles.listHeaderRow}>
                        <Text style={styles.sectionTitle}>Available Pokémon</Text>
                        <TouchableOpacity 
                            style={styles.catchBtn}
                            onPress={handleCatchPokemon}
                            disabled={catching}
                        >
                            {catching ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <>
                                    <Ionicons name="flash" size={16} color="#fff" />
                                    <Text style={styles.catchBtnText}>Batalhar</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {ownedPokemons.length === 0 ? (
                        <View style={styles.emptyTeamContainer}>
                            <Text style={styles.emptyTeamText}>Batalhe para ganhar seus primeiros Pokémons!</Text>
                        </View>
                    ) : (
                        <FlatList
                        data={ownedPokemons}
                        key={columns}
                        keyExtractor={(item) => item.index}
                        numColumns={columns}
                        columnWrapperStyle={styles.row}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => {
                            const isSelected = selectedTeam.some(p => p.index === item.index);
                            return (
                                <TouchableOpacity 
                                    style={[styles.gridCard, isSelected && styles.gridCardSelected, { width: isMobileSize ? '30%' : desktopCardWidth }]}
                                    onPress={() => toggleSelection(item)}
                                    activeOpacity={0.7}
                                >
                                    <Image source={{ uri: item.imagem }} style={styles.gridImage} />
                                    <Text style={styles.gridName} numberOfLines={1}>
                                        {item.nome.charAt(0).toUpperCase() + item.nome.slice(1)}
                                    </Text>
                                    {isSelected && (
                                        <View style={styles.checkBadge}>
                                            <Ionicons name="checkmark" size={16} color="#fff" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />
                    )}
                </View>
            </View>

            {/* Catch Animation Modal */}
            <Modal
                visible={!!caughtPokemon}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Vitória!</Text>
                        <Image source={{ uri: caughtPokemon?.imagem }} style={styles.modalImage} />
                        <Text style={styles.modalText}>
                            Você ganhou um <Text style={{fontWeight:'bold'}}>{caughtPokemon?.nome.toUpperCase()}</Text>!
                        </Text>
                        <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setCaughtPokemon(null)}>
                            <Text style={styles.modalCloseText}>Incrível!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Swap Modal */}
            <Modal
                visible={!!pokemonToSwapIn}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalBg}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.modalTitle, { fontSize: 22, color: '#bb263f' }]}>Trocar Pokémon</Text>
                        <Text style={styles.modalText}>
                            Qual Pokémon do seu time você deseja substituir por <Text style={{fontWeight:'bold'}}>{pokemonToSwapIn?.nome.toUpperCase()}</Text>?
                        </Text>
                        
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginVertical: 20}}>
                            {selectedTeam.map(p => (
                                <TouchableOpacity 
                                    key={p.index} 
                                    style={styles.selectedCard}
                                    onPress={() => executeSwap(p, pokemonToSwapIn!)}
                                >
                                    <Image source={{ uri: p.imagem }} style={styles.selectedImage} />
                                    <View style={styles.removeBadge}>
                                        <Ionicons name="swap-horizontal" size={12} color="#fff" />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={[styles.modalCloseBtn, { backgroundColor: '#888' }]} onPress={() => setPokemonToSwapIn(null)}>
                            <Text style={styles.modalCloseText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },
    wrapper: {
        flex: 1,
        maxWidth: 1000,
        width: '100%',
        alignSelf: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F6F8',
    },
    teamSection: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 15,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
        elevation: 6,
        zIndex: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#333',
        marginBottom: 15,
    },
    emptyTeamContainer: {
        height: 90,
        backgroundColor: '#f9f9f9',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#eee',
        borderStyle: 'dashed',
    },
    emptyTeamText: {
        color: '#888',
        fontSize: 15,
        fontWeight: '500',
    },
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    selectedCard: {
        width: 64,
        height: 64,
        backgroundColor: '#fff',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#bb263f',
        position: 'relative',
        shadowColor: '#bb263f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    selectedImage: {
        width: 45,
        height: 45,
    },
    removeBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#bb263f',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listSection: {
        flex: 1,
        padding: 15,
    },
    listHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    catchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1d6ba0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        shadowColor: '#1d6ba0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    catchBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    row: {
        justifyContent: 'flex-start',
        gap: 15,
        marginBottom: 15,
    },
    gridCard: {
        width: '30%',
        aspectRatio: 0.8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    gridCardSelected: {
        borderWidth: 2,
        borderColor: '#7AC74C',
        backgroundColor: '#f0faf0',
    },
    gridImage: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    gridName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    checkBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#7AC74C',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#F7D02C',
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginBottom: 15,
    },
    modalImage: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    modalText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 25,
    },
    modalCloseBtn: {
        backgroundColor: '#bb263f',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    modalCloseText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
