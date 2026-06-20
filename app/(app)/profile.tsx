import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { width: screenWidth } = useWindowDimensions();

  if (!user) return null;

  // Use dynamic avatar based on username initial or random pokemon. Let's stick to Pikachu for now.
  const picture = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
  
  const matches = user.partidas;
  const winRate = matches > 0 ? ((user.vitorias / matches) * 100).toFixed(1) : "0.0";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.wrapper}>
        
        <View style={styles.headerCard}>
          <View style={styles.coverPhotoContainer}>
            <View style={styles.coverGradient} />
          </View>

          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: picture }} style={styles.avatar} />
              <View style={styles.badge}>
                <Ionicons name="star" size={16} color="#FFF" />
              </View>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</Text>
            <Text style={styles.title}>Lvl {user.level} Pokémon Trainer</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Battle Statistics</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: 'rgba(29, 107, 160, 0.1)' }]}>
              <Ionicons name="game-controller" size={28} color="#1d6ba0" />
            </View>
            <Text style={styles.statValue}>{matches}</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: 'rgba(122, 199, 76, 0.1)' }]}>
              <Ionicons name="trophy" size={28} color="#7AC74C" />
            </View>
            <Text style={styles.statValue}>{user.vitorias}</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.iconBg, { backgroundColor: 'rgba(187, 38, 63, 0.1)' }]}>
              <Ionicons name="skull" size={28} color="#bb263f" />
            </View>
            <Text style={styles.statValue}>{user.derrotas}</Text>
            <Text style={styles.statLabel}>Losses</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Win Rate</Text>
            <Text style={styles.infoValue}>{winRate}%</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Region</Text>
            <Text style={styles.infoValue}>Kanto</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Badges</Text>
            <Text style={styles.infoValue}>8</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 100 : 120,
  },
  wrapper: {
    padding: 20,
    alignItems: 'center',
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  headerCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
    marginBottom: 30,
    marginTop: 10,
    overflow: 'hidden',
  },
  coverPhotoContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#bb263f',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPhoto: {
    width: '120%',
    height: '120%',
  },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#fff',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F7D02C',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: '#333',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  statCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#333',
  },
  statLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
    marginTop: 2,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
});
