import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CategoriesData } from "../../data/CategoriesData";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {CategoriesData?.map((item) => (
        <View key={item._id}>
          <TouchableOpacity
            style={styles.catContainer}
            onPress={() => navigation.navigate(item.path)}
          >
            <AntDesign name={item.icon} size={28} />
            <Text style={{ fontSize: 12 }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  catContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Categories;
