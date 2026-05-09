import React from "react"
import { ImageSourcePropType } from "react-native";

export type CardProps = {
    id: number;
    name: string;
    img: ImageSourcePropType;
    type: string[];
    onPress?: () => void;
}

