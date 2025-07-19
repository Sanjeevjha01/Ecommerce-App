import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { removeFromCart } from "@/redux/features/auth/userActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseBtn = () => {
    // Dispatch action to increase quantity
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  };

  const handleDecreaseBtn = () => {
    if (item.quantity === 1) {
      // Remove item from cart if quantity is 1
      dispatch(removeFromCart(item.id));
    } else {
      // Decrease quantity
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: { id: item.id, quantity: item.quantity - 1 },
      });
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: item?.imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.price}>${item?.price}</Text>
          <Text style={styles.total}>
            Total: ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.cartCont}>
          <View style={styles.qtyCont}>
            <TouchableOpacity onPress={handleDecreaseBtn}>
              <AntDesign name="minuscircleo" style={styles.decreseBtn} />
            </TouchableOpacity>

            <Text style={styles.qtyInput}>{item.quantity}</Text>

            <TouchableOpacity onPress={handleIncreaseBtn}>
              <AntDesign name="pluscircleo" style={styles.increaseBtn} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRemoveItem}
              style={styles.removeBtn}
            >
              <AntDesign name="delete" style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  price: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  total: {
    fontSize: 12,
    color: "#25be84",
    fontWeight: "bold",
  },
  cartCont: {
    alignItems: "center",
    justifyContent: "center",
  },
  qtyCont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  decreseBtn: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 5,
  },
  increaseBtn: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 5,
  },
  qtyInput: {
    width: 30,
    height: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 15,
    marginHorizontal: 6,
    paddingVertical: 4,
  },
  removeBtn: {
    padding: 5,
  },
  removeIcon: {
    fontSize: 16,
    color: "#ff4444",
  },
});

export default CartItem;
