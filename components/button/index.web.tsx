import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import { ButtonProps } from './types';

export default function ButtonWeb({ 
  title,
  onPress,
  disable
}: ButtonProps) {
    return(
        <TouchableOpacity disabled={disable} style={[styles.button, disable && styles.disabledButton]} activeOpacity={0.6} onPress={onPress} >
                <Text style={styles.text}>
                    {title}
                </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabledButton:{
        backgroundColor: '#dc0a2d75',
    padding: 15,
    borderRadius: 10,
    },
    button: {
      backgroundColor: '#dc0a2d',
    padding: 15,
    borderRadius: 10,
    },

    text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }

})