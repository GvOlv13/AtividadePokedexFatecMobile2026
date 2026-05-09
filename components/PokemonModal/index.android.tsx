import React from "react";

import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { PokemonModalProps } from "./types";

export default function PokemonModalAndroid({
  visible,
  onClose,
  pokemon,
}: PokemonModalProps) {

  if (!pokemon) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >

      <View style={styles.overlay}>

        <View style={styles.modal}>

          <View style={styles.header}>
            <Text style={styles.id}>
              #{pokemon.id}
            </Text>

            <Pressable onPress={onClose}>
              <Text style={styles.close}>
                ✕
              </Text>
            </Pressable>
          </View>

          <Image
            source={pokemon.img}
            resizeMode="contain"
            style={styles.image}
          />

          <Text style={styles.name}>
            {pokemon.name}
          </Text>

          <View style={styles.types}>
            {pokemon.type.map((item, index) => (
              <Text
                key={`${item}-${index}`}
                style={styles.type}
              >
                {item}
              </Text>
            ))}
          </View>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  close: {
    fontSize: 22,
    fontWeight: "bold",
  },

  id: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
  },

  image: {
    width: 220,
    height: 220,
  },

  name: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  types: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  type: {
    backgroundColor: "#1d6ba0",
    color: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    fontWeight: "bold",
  },

});