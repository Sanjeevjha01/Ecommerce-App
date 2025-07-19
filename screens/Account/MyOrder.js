import { ScrollView, StyleSheet, Text, View } from "react-native";
import { orderData } from "../../data/OrderData";
import OrderItem from "../../components/Form/OrderItem";

const MyOrder = ({ order }) => {
  return (
    <ScrollView>
      {orderData.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MyOrder;
