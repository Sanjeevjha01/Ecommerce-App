import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { ProductData } from "@/data/ProductData";
import Layout from "@/components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/auth/userActions";
import Checkout from "./Checkout";

const ProductDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [proDetails, setProDetails] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [isAdded, setIsAdded] = useState(false);

  // handle add to cart button
  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };
  // get product details
  useEffect(() => {
    //find product details
    if (item || item.id) {
      const getProduct = ProductData.find((product) => product.id === item.id);
      setProDetails(getProduct);
    }
  }, [item]);

  // for remove cart functionality
  useEffect(() => {
    const found = cartItems.some((el) => el && el.id === item.id);
    setIsAdded(found);
  }, [cartItems, item?.id]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Layout>
      <View style={styles.mainCont}>
        <Image source={{ uri: proDetails?.imageUrl }} style={styles.image} />
        <View style={styles.detailsCont}>
          <Text style={styles.proName}>{proDetails?.name}</Text>
          <Text style={styles.proPrice}>
            Price:
            {proDetails?.price}
            {proDetails?.currency}
          </Text>
          <Text>{proDetails?.description}</Text>
        </View>
        <View style={styles.cartCont}>
          {isAdded ? (
            <TouchableOpacity
              style={[styles.cartBtn, { width: 150 }]}
              onPress={() => handleRemoveFromCart(item)}
              disabled={proDetails?.quantity <= 0}
            >
              <Text style={styles.cartBtnText}>Remove From Cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={() => handleAddToCart(item)}
              // disabled={proDetails?.quantity <= 0}
            >
              <Text style={styles.cartBtnText}>Add To Cart</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.cartBtn, { backgroundColor: "blue" }]}
            onPress={() => navigation.navigate(Checkout)}
          >
            <Text style={styles.cartBtnText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    padding: 10,
    backgroundColor: "#ffffff",
    height: "100%",
    paddingBottom: "40%",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
  detailsCont: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
    marginTop: 30,
  },
  proName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  proPrice: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#4caf50",
  },
  cartCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: -40,
  },
  cartBtn: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    height: 40,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cartBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  qtyCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  decreseBtn: {
    fontSize: 26,
    color: "#333",
    paddingHorizontal: 5,
  },
  increaseBtn: {
    fontSize: 26,
    color: "#333",
    paddingHorizontal: 5,
  },
  qtyInput: {
    width: 50,
    height: 36,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 15,
    marginHorizontal: 6,
    paddingVertical: 4,
  },
});

export default ProductDetails;
