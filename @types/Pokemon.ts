export interface Poder {
    nome: string;
    forca: number;
}

export interface Pokemon {
    index: string;
    nome: string;
    imagem: string;
    tipos: string[];
    poderes: Poder[];
    peso?: number;
    altura?: number;
    habilidades?: string[];
}