import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Notification = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="notifications-paused" style={styles.icon} />
      <Text style={styles.text}>OOPS ! Your notification is empty.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "green",
    fontSize: 15,
  },
  icon: {
    marginBottom: 20,
    fontSize: 100,
  },
});

export default Notification;
