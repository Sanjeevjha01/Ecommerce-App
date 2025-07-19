import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import Footer from "../components/Layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "@/redux/features/auth/userActions";
import { FontAwesome } from "@expo/vector-icons";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.categoryName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id?.toString()}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", padding: 16 },

  list: { paddingBottom: 100 },
  categoryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryText: {
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderColor: "lightgray",
    padding: 8,
    backgroundColor: "#fff",
  },
});

export default Categories;
