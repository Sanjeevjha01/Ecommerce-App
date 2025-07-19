import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderInfo}>
        <Text>Order ID: {order.id}</Text>
        <Text>Date: {order.date}</Text>
      </View>
      <Text>Product name: {order.productInfo.name}</Text>
      <Text>Price: {order.productInfo.price} $</Text>
      <Text>Quantity: {order.productInfo.qty}</Text>
      <Text>Total Amount: {order.totalAmount} $</Text>
      <View>
        <Text style={styles.status}>Status: {order.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 5,
  },
  status: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    fontWeight: "bold",
    padding: 5,
  },
});

export default OrderItem;
