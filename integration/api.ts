import axios from 'axios';
import { Pokemon } from '../@types/Pokemon';

const BASE_URL = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon';

export interface UserProfile {
    id: string;
    username: string;
    level: number;
    vitorias: number;
    derrotas: number;
    partidas: number;
}

export const apiIntegration = {
    async register(username: string, password: string):Promise<UserProfile> {
        const res = await axios.post(`${BASE_URL}/auth/v1/register`, { username, password });
        return this.getProfile(res.data.userId);
    },

    async login(username: string, password: string):Promise<UserProfile> {
        const res = await axios.post(`${BASE_URL}/auth/v1/login`, { username, password });
        return this.getProfile(res.data.userId);
    },

    async getProfile(userId: string): Promise<UserProfile> {
        const res = await axios.get(`${BASE_URL}/auth/v1/stats/${userId}`);
        const data = res.data;
        return {
            id: data.userId,
            username: data.username,
            level: data.level,
            vitorias: data.vitorias,
            derrotas: data.derrotas,
            partidas: data.vitorias + data.derrotas
        };
    },

    // Retorna { team: Pokemon[], capture: Pokemon[] }
    async getTeamAndCaptured(userId: string): Promise<{ team: Pokemon[], capture: Pokemon[] }> {
        const res = await axios.get(`${BASE_URL}/pokemon/v1/team?user-id=${userId}`);
        
        const mapPokemon = (p: any): Pokemon => ({
            index: p.index,
            nome: p.name,
            imagem: p.image,
            tipos: p.types,
            habilidades: p.abilities,
            poderes: [] // API não retorna poderes
        });

        return {
            team: res.data.team.map(mapPokemon),
            capture: res.data.capture.map(mapPokemon)
        };
    },

    async capturePokemon(userId: string, pokemonId: string | number): Promise<void> {
        await axios.put(`${BASE_URL}/pokemon/v1/captured?user-id=${userId}&pokemon-id=${pokemonId}`);
    },

    async swapTeamPokemon(userId: string, removedPokemonId: string | number, newPokemonId: string | number): Promise<void> {
        await axios.put(`${BASE_URL}/pokemon/v1/team?user-id=${userId}`, {
            removedPokemon: Number(removedPokemonId),
            newPokemon: Number(newPokemonId)
        });
    },

    async updateTeamOrder(userId: string, teamIndexes: (string | number)[]): Promise<void> {
        if (teamIndexes.length !== 5) {
            throw new Error("A API exige exatamente 5 Pokémons para atualizar a ordem.");
        }
        await axios.put(`${BASE_URL}/pokemon/v1/team?user-id=${userId}`, {
            teamOrder: teamIndexes.map(Number)
        });
    }
};
