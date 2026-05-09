import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CardProps } from "./type";

export default function Card({
    id,
    name,
    img,
    type,
    onPress,
}: CardProps){
    return(
        <TouchableOpacity onPress={onPress} style={styles.card}>
       
            <View style={styles.id}>
                <Text style={{ color: 'white' }}>#{id}</Text>
            </View>

            <View style={styles.img}>
                <Image
                resizeMode="contain"
                source={img}
                style={[{width: 140, height: 140 }]}
                />
            </View>

            <View style={styles.name}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20}}>{name}</Text>
            </View>
            
            <View style={styles.pokemonType}>
               <Text style={styles.type}>{type}</Text> 
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 170,
        height: 250,
        borderRadius: 10,
        backgroundColor: '#1d6ba0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10
    },
    id:{
        width: '100%',
        alignItems: 'flex-end'
    },
    img:{
        width: '100%',
        alignItems: 'center'
    },
    name:{
        marginTop: 15,
        width: '100%',
        alignItems: 'center'
    },
        pokemonType:{
        alignItems: 'center',
        marginTop: 10,
    },
    type:{
        fontSize: 10,
        color: '#ffffff',
        fontWeight: 'bold',
        padding: 6,
        borderRadius: 50,
        backgroundColor: '#ffffff62',
        alignItems: 'center'
    }


})