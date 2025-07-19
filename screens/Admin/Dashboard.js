import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { userData } from "@/data/UserData";

const Dashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.btnCont}
        onPress={() => {
          console.log("Manage product Pressed");
        }}
      >
        <AntDesign name="edit" style={styles.icon} />
        <Text style={styles.iconTxt}>Manage Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCont}
        onPress={() => {
          console.log("Manage category Pressed");
        }}
      >
        <AntDesign name="bars" style={styles.icon} />
        <Text style={styles.iconTxt}>Manage Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCont}
        onPress={() => {
          console.log("Manage user Pressed");
        }}
      >
        <AntDesign name="user" style={styles.icon} />
        <Text style={styles.iconTxt}>Manage Users</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCont}
        onPress={() => navigation.navigate("MyOrder", { id: userData.id })}
      >
        <AntDesign name="shoppingcart" style={styles.icon} />
        <Text style={styles.iconTxt}>Manage Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnCont}
        onPress={() => {
          console.log("About app pressed");
        }}
      >
        <AntDesign name="info" style={styles.icon} />
        <Text style={styles.iconTxt}>About App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 20,
  },
  btnCont: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    height: 35,
    resizeMode: "contain",
    padding: 5,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    elevation: 8,
    shadowOffset: 8,
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  iconTxt: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Dashboard;
