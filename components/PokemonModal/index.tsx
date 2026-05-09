import { Platform } from 'react-native';

import PokemonModalAndroid from './index.android';
// import ButtonWeb from './index.web';

const Button = Platform.select({
    android: PokemonModalAndroid,
    // web: ButtonWeb,
    default: PokemonModalAndroid
});

export default Button;