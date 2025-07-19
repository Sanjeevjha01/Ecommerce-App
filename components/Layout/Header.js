import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import logoImg from "../../assets/images/logoImg.jpeg";
import { ProductData } from "@/data/ProductData";
import ProductCard from "../Products/ProductCard";

const Header = ({ onSearch }) => {
  const [input, setInput] = useState("");

  // handle search
  const handleSearchPress = () => {
    if (onSearch) {
      onSearch(input);
    }
  };

  return (
    <View style={{ marginTop: 0, height: 80 }}>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        <TextInput
          style={styles.inputBox}
          placeholder="Search Product "
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
          <FontAwesome name="search" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#afd8d1",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  inputBox: {
    borderWidth: 0.3,
    width: "70%",
    position: "absolute",
    left: 15,
    height: 40,
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 5,
    marginLeft: "30%",
  },
  searchBtn: {
    position: "absolute",
    left: "95%",
  },
  searchIcon: {
    fontSize: 18,
    color: "#967a66",
  },
});

export default Header;
