import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const Payment = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      Alert.alert("Missing Info", "Please fill all payment details.");
      return;
    }

    // Dispatch your payment action here
    // dispatch(paymentActions({ cardNumber, expiry, cvv }))
    Alert.alert("Payment Success", "Thank you for your purchase!");
    navigation.navigate("OrderConfirmation"); // or wherever you want
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Expiry</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiry}
            onChangeText={setExpiry}
          />
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            secureTextEntry
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Order Summary</Text>
        <Text style={styles.summaryLine}>Subtotal: $45.00</Text>
        <Text style={styles.summaryLine}>Shipping: $5.00</Text>
        <Text style={styles.summaryTotal}>Total: $50.00</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.48,
  },
  summary: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
    elevation: 1,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryLine: {
    fontSize: 16,
    marginVertical: 2,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1e90ff",
  },
  payButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Payment;
