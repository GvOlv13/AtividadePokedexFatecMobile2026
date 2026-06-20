import React from 'react-native';
import {inputProps} from './types';
import { useState } from 'react';
import {  TextInput, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function InputWeb({
    placeholder,
    value,
    onChangeText,
    secureTextEntry
}: inputProps){
    
    return(
        <TextInput 
            style={styles.input} 
            placeholder={placeholder} 
            value={value} 
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
 
}


const styles = StyleSheet.create({
    input:{
        backgroundColor: '#fafafa',
        borderColor: "#00000013",
        borderWidth: 1,
        height: 40,
        width: "100%",
        borderRadius: 8,
        paddingLeft: 15,

    }
});


