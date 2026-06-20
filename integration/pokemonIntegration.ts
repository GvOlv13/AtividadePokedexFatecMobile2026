import axios from 'axios';
import { Pokemon } from '../@types/Pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async (limit = 151): Promise<Pokemon[]> => {
  const response = await api.get(`/pokemon?limit=${limit}`);
  const list = response.data.results;

  const detailedList = await Promise.all(
    list.map(async (pokemon: { url: string }) => {
      const detailRes = await axios.get(pokemon.url);
      const data = detailRes.data;

      return {
        nome: data.name,
        index: data.id.toString().padStart(3, '0'),
        tipos: data.types.map((t: any) => t.type.name),
        imagem: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
        peso: data.weight / 10, // weight is in hectograms, convert to kg
        altura: data.height / 10, // height is in decimetres, convert to meters
        habilidades: data.abilities.map((a: any) => a.ability.name),
        poderes: data.stats.map((s: any) => ({
          nome: s.stat.name,
          forca: s.base_stat,
        })),
      };
    })
  );

  return detailedList;
};

export const getPokemonDetails = async (idOrName: string | number): Promise<Pokemon> => {
  const detailRes = await api.get(`/pokemon/${idOrName}`);
  const data = detailRes.data;

  return {
    nome: data.name,
    index: data.id.toString().padStart(3, '0'),
    tipos: data.types.map((t: any) => t.type.name),
    imagem: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
    peso: data.weight / 10,
    altura: data.height / 10,
    habilidades: data.abilities.map((a: any) => a.ability.name),
    poderes: data.stats.map((s: any) => ({
      nome: s.stat.name,
      forca: s.base_stat,
    })),
  };
};