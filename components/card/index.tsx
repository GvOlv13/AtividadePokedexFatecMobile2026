import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from "react-native";
import { CardProps } from "./type";

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

type Props = {
    id: number;
    name: string;
    img: any;
    type: string | string[];
    onPress?: () => void;
    width?: number;
};

export default function Card({ id, name, img, type, onPress, width }: Props) {
    const primaryType = Array.isArray(type) ? type[0] : type;
    const backgroundColor = typeColors[primaryType?.toLowerCase()] || '#1d6ba0';

    const formattedId = id.toString().padStart(3, '0');

    return(
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles.card, 
                { backgroundColor },
                width ? { width, height: width } : { width: '47%', aspectRatio: 1 }
            ]} 
            activeOpacity={0.8}
        >
            <View style={styles.header}>
                <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                <Text style={styles.id}>#{formattedId}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.typesContainer}>
                    {Array.isArray(type) ? (
                        type.map((t, index) => (
                            <View key={index} style={styles.typeBadge}>
                                <Text style={styles.typeText}>{t}</Text>
                            </View>
                        ))
                    ) : (
                        <View style={styles.typeBadge}>
                            <Text style={styles.typeText}>{type}</Text>
                        </View>
                    )}
                </View>

                <Image
                    resizeMode="contain"
                    source={img}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 15,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        zIndex: 2,
    },
    name: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    id: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontWeight: 'bold',
        fontSize: 14,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        zIndex: 2,
    },
    typesContainer: {
        alignItems: 'flex-start',
        gap: 8,
    },
    typeBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    typeText: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    image: {
        width: 90,
        height: 90,
        position: 'absolute',
        right: -10,
        bottom: -10,
        zIndex: 2,
    }
});