import React, { Children } from "react";
import { Text, StyleSheet  } from "react-native";

type Props = {
    children: React.ReactNode;
}

export default function Title({children}: Props){
    return(
        <Text style={styles.Text}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    Text: {
        fontSize: 30,
        fontWeight: 'bold',
    }

});