import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const cardData = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    setCartItems(Array.isArray(cardData) ? cardData.length : 0);
  }, [cardData]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          name="home"
          style={[styles.icon, route.name === "Home" && styles.activeIcon]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Home" && styles.activeIconTxt,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Categories")}
      >
        <MaterialIcons
          name="category"
          style={[
            styles.icon,
            route.name === "Categories" && styles.activeIcon,
          ]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Categories" && styles.activeIconTxt,
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Cart")}
      >
        <View style={styles.iconWrapper}>
          <AntDesign
            name="shoppingcart"
            style={[styles.icon, route.name === "Cart" && styles.activeIcon]}
          />
          {cartItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems}</Text>
            </View>
          )}
          <Text
            style={[
              styles.iconText,
              route.name === "Cart" && styles.activeIconTxt,
            ]}
          >
            Cart
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <AntDesign
          name="user"
          style={[styles.icon, route.name === "Account" && styles.activeIcon]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "Account" && styles.activeIconTxt,
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    // backgroundColor: "#000000",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 23,
    color: "#000000",
  },
  badgeIcon: {
    fontSize: 12,
  },

  iconText: {
    fontSize: 13,
    color: "#000000",
  },
  activeIcon: {
    color: "lightblue",
  },
  activeIconTxt: {
    color: "#3f9430",
  },
  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Footer;
