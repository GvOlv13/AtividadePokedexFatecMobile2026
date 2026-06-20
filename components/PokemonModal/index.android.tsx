import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pokemon } from '@/@types/Pokemon';

type PokemonModalProps = {
  visible: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
};

const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export default function PokemonModal({ visible, onClose, pokemon }: PokemonModalProps) {
  if (!pokemon) return null;

  const primaryType = pokemon.tipos[0]?.toLowerCase();
  const bgColor = typeColors[primaryType] || '#1d6ba0';

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { backgroundColor: bgColor }]}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.idText}>#{pokemon.index}</Text>
          </View>

          {/* NOME E TIPOS */}
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1)}
            </Text>
            <View style={styles.typesRow}>
              {pokemon.tipos.map((t, i) => (
                <View key={i} style={styles.typeBadge}>
                  <Text style={styles.typeText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* IMAGEM DO POKÉMON */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: pokemon.imagem }} 
              style={styles.pokemonImage} 
              resizeMode="contain" 
            />
          </View>

          {/* DETALHES (BOTTOM SHEET) */}
          <View style={styles.detailsSheet}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              
              <Text style={[styles.sectionTitle, { color: bgColor }]}>About</Text>
              <View style={styles.aboutRow}>
                <View style={styles.aboutItem}>
                  <Ionicons name="scale-outline" size={24} color="#666" />
                  <Text style={styles.aboutValue}>{pokemon.peso} kg</Text>
                  <Text style={styles.aboutLabel}>Weight</Text>
                </View>
                <View style={styles.aboutDivider} />
                <View style={styles.aboutItem}>
                  <Ionicons name="resize-outline" size={24} color="#666" />
                  <Text style={styles.aboutValue}>{pokemon.altura} m</Text>
                  <Text style={styles.aboutLabel}>Height</Text>
                </View>
              </View>

              <Text style={[styles.sectionTitle, { color: bgColor, marginTop: 20 }]}>Abilities</Text>
              <View style={styles.abilitiesContainer}>
                {pokemon.habilidades?.map((ability, index) => (
                  <View key={index} style={styles.abilityBadge}>
                    <Text style={styles.abilityText}>
                      {ability.charAt(0).toUpperCase() + ability.slice(1).replace('-', ' ')}
                    </Text>
                  </View>
                ))}
              </View>

              <Text style={[styles.sectionTitle, { color: bgColor, marginTop: 20 }]}>Base Stats</Text>
              <View style={styles.statsContainer}>
                {pokemon.poderes.map((stat, index) => (
                  <View key={index} style={styles.statRow}>
                    <Text style={styles.statName}>
                      {stat.nome.toUpperCase().replace('SPECIAL-', 'SP. ')}
                    </Text>
                    <Text style={styles.statValue}>{stat.forca.toString().padStart(3, '0')}</Text>
                    <View style={styles.statBarBg}>
                      <View 
                        style={[
                          styles.statBarFill, 
                          { 
                            width: `${Math.min((stat.forca / 255) * 100, 100)}%`, 
                            backgroundColor: stat.forca >= 50 ? bgColor : '#bb263f' 
                          }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
              </View>

            </ScrollView>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: Platform.OS === 'web' ? 'center' : 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: Platform.OS === 'web' ? Math.min(width * 0.9, 500) : '100%',
    height: Platform.OS === 'web' ? Math.min(height * 0.9, 800) : '90%',
    borderRadius: Platform.OS === 'web' ? 24 : 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // REMOVIDO o overflow: 'hidden' pois é ele quem cortava a cabeça da imagem no Android
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    zIndex: 10,
    elevation: 10, // Garante que fique clicável no Android
  },
  closeButton: {
    padding: 5,
  },
  idText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameContainer: {
    paddingHorizontal: 20,
    zIndex: 10,
    elevation: 10, // Garante visibilidade da font no Android
  },
  nameText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  typesRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  typeBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    zIndex: 20, 
    elevation: 20, // CRÍTICO PARA O ANDROID: Faz a imagem "flutuar" sobre a sheet branca inferior
    marginTop: 10,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: -30,
  },
  detailsSheet: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 1,
    elevation: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutItem: {
    alignItems: 'center',
    flex: 1,
  },
  aboutValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  aboutLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  aboutDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  abilityBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  abilityText: {
    color: '#444',
    fontWeight: '600',
  },
  statsContainer: {
    marginTop: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 70,
    color: '#666',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statValue: {
    width: 40,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 15,
  },
  statBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});