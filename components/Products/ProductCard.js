import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/auth/userActions";
import ProductDetails from "@/screens/ProductDetails";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [isAdded, setIsAdded] = useState(false);

  //function for details button
  const handleDetailBtn = (id) => {
    navigation.navigate("ProductDetails", { item });
  };

  //function for cart button
  const handleCartBtn = (item) => {
    const payload = { ...item, quantity: 1 };
    dispatch(addToCart(payload));
  };

  // added to cart functionality
  useEffect(() => {
    const found = cartItems.some((el) => el && el.id === item.id);
    setIsAdded(found);
  }, [cartItems, item?.id]);

  return (
    <View>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{ uri: item.imageUrl }} />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDesc}>
          {item.description.substring(0, 30)} ...more
        </Text>
        <View style={styles.btnCont}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleDetailBtn(item.id)}
          >
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
          {isAdded ? (
            <TouchableOpacity style={[styles.btnCart, { width: 80 }]}>
              <Text style={styles.btnText}>Added to cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnCart}
              onPress={() => handleCartBtn(item)}
            >
              <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginVertical: 5,
    // marginHorizontal: 3,
    marginLeft: 5,
    // width: "90%",
    padding: 12,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    borderRadius: 10,
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginRight: 10,
  },
  cardImage: {
    height: 135,
    width: "100%",
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 10,
    textAlign: "left",
  },
  btnCont: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#222727",
    height: 20,
    width: 65,
    borderRadius: 5,
    justifyContent: "center",
  },
  btnCart: {
    backgroundColor: "#074848",
    height: 20,
    width: 65,
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductCard;
