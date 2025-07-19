import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Checkout = ({ navigation }) => {
  //function for cod order btn
  const handleCod = () => {
    alert("Your order has been placed");
  };

  //function for online payment btn
  const handleOnline = () => {
    navigation.navigate("Payment");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Options:</Text>
      <Text style={styles.totalAmount}>Total amount: 1000$</Text>
      <View style={styles.paymentCardCont}>
        <Text style={styles.paymentHeading}>Select your payment mode:</Text>
        <TouchableOpacity style={styles.paymentBtn} onPress={handleCod}>
          <Text style={styles.paymentBtnTxt}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentBtn} onPress={handleOnline}>
          <Text style={styles.paymentBtnTxt}>Online (CREDIT | DEBIT CARD)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginVertical: 20,
  },
  totalAmount: {
    fontSize: 20,
    marginBottom: 10,
    color: "gray",
  },
  paymentCardCont: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 10,
    padding: 30,
    marginVertical: 10,
  },
  paymentHeading: {
    color: "gray",
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: "#000000",
    marginVertical: 10,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
  paymentBtnTxt: {
    color: "#ffffff",
    textAlign: "center",
  },
});
export default Checkout;
