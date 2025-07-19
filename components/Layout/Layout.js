import { View, StyleSheet } from "react-native";
import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow full height for layout
  },
  content: {
    flex: 1, // Fill space above the footer
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    padding: 8,
    backgroundColor: "#fff",
  },
});

export default Layout;
