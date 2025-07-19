import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import PriceTable from "../components/Cart/PriceTable";
import Layout from "@/components/Layout/Layout";
import CartItem from "../components/Cart/CartItem";

const Cart = ({ navigation }) => {
  // Get cart items from Redux store instead of hardcoded data
  const cartItems = useSelector((state) => state.cart);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const subtotal = calculateTotal();
  const tax = subtotal * 0.1;
  const shipping = cartItems.length > 0 ? 5 : 0;
  const grandTotal = subtotal + tax + shipping;

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>
          {cartItems?.length > 0
            ? `You've ${cartItems?.length} item${
                cartItems.length > 1 ? "s" : ""
              } in your cart`
            : "OOPS your cart is empty"}
        </Text>

        {cartItems?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}

        {cartItems.length > 0 && (
          <>
            <PriceTable title={"Subtotal"} price={subtotal.toFixed(2)} />
            <PriceTable title={"Tax"} price={tax.toFixed(2)} />
            <PriceTable title={"Shipping"} price={shipping.toFixed(2)} />
            <View style={styles.grandTotal}>
              <PriceTable title={"Grand Total"} price={grandTotal.toFixed(2)} />
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.checkoutBtnTxt}>Checkout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  heading: {
    textAlign: "center",
    color: "green",
    marginVertical: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  checkoutBtn: {
    borderColor: "#000000",
    borderWidth: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: "90%",
    height: 40,
    marginHorizontal: 20,
    backgroundColor: "#25be84",
  },
  checkoutBtnTxt: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default Cart;
