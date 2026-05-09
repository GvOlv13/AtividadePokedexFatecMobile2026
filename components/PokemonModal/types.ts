import { ImageSourcePropType } from "react-native";

export type PokemonModalProps = {
  visible: boolean;
  onClose: () => void;

  pokemon: {
    id: number;
    name: string;
    img: ImageSourcePropType;
    type: string[];
  } | null;
}