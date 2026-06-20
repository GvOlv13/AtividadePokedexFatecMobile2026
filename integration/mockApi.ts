import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../@types/Pokemon";
import { getPokemonDetails } from "./pokemonIntegration";

// Generate a simple UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Emulates the DB entities
export interface UserProfile {
    id: string;
    username: string;
    password?: string;
    level: number;
    vitorias: number;
    derrotas: number;
    partidas: number;
}

const STORAGE_KEY_USERS = "@MockDB:Users";
const STORAGE_KEY_CAPTURED = "@MockDB:Captured:";
const STORAGE_KEY_TEAM = "@MockDB:Team:";

export const mockApi = {
    // ---------------- AUTH ----------------
    async register(username: string, password: string):Promise<UserProfile> {
        const usersStr = await AsyncStorage.getItem(STORAGE_KEY_USERS);
        const users: UserProfile[] = usersStr ? JSON.parse(usersStr) : [];
        
        if (users.find(u => u.username === username)) {
            throw new Error("Usuário já existe");
        }

        const newUser: UserProfile = {
            id: generateUUID(),
            username,
            password,
            level: 1,
            vitorias: 0,
            derrotas: 0,
            partidas: 0
        };

        users.push(newUser);
        await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

        // Start with Pikachu by default for new users (optional but cool)
        try {
            const pikachu = await getPokemonDetails(25);
            await this.capturePokemon(newUser.id, pikachu);
        } catch(e) {}

        return newUser;
    },

    async login(username: string, password: string):Promise<UserProfile> {
        const usersStr = await AsyncStorage.getItem(STORAGE_KEY_USERS);
        const users: UserProfile[] = usersStr ? JSON.parse(usersStr) : [];
        
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            throw new Error("Credenciais inválidas");
        }
        return user;
    },

    // ---------------- PROFILE / STATS ----------------
    async getProfile(userId: string): Promise<UserProfile> {
        const usersStr = await AsyncStorage.getItem(STORAGE_KEY_USERS);
        const users: UserProfile[] = usersStr ? JSON.parse(usersStr) : [];
        const user = users.find(u => u.id === userId);
        if (!user) throw new Error("Usuário não encontrado");
        return user;
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
        const usersStr = await AsyncStorage.getItem(STORAGE_KEY_USERS);
        let users: UserProfile[] = usersStr ? JSON.parse(usersStr) : [];
        
        users = users.map(u => {
            if (u.id === userId) {
                return { ...u, ...updates, partidas: (updates.vitorias ?? u.vitorias) + (updates.derrotas ?? u.derrotas) };
            }
            return u;
        });

        await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    },

    // ---------------- CAPTURED POKEMONS ----------------
    async getCaptured(userId: string): Promise<Pokemon[]> {
        const data = await AsyncStorage.getItem(STORAGE_KEY_CAPTURED + userId);
        return data ? JSON.parse(data) : [];
    },

    async capturePokemon(userId: string, pokemon: Pokemon): Promise<void> {
        const captured = await this.getCaptured(userId);
        // Evita duplicatas se já tiver
        if (!captured.find(p => p.index === pokemon.index)) {
            captured.push(pokemon);
            await AsyncStorage.setItem(STORAGE_KEY_CAPTURED + userId, JSON.stringify(captured));
        }
    },

    // ---------------- TEAM ----------------
    async getTeam(userId: string): Promise<Pokemon[]> {
        const data = await AsyncStorage.getItem(STORAGE_KEY_TEAM + userId);
        return data ? JSON.parse(data) : [];
    },

    async updateTeam(userId: string, teamPokemons: Pokemon[]): Promise<void> {
        if (teamPokemons.length > 5) {
            throw new Error("O time pode ter no máximo 5 Pokémons");
        }
        await AsyncStorage.setItem(STORAGE_KEY_TEAM + userId, JSON.stringify(teamPokemons));
    }
};
