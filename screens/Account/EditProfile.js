import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import InputBox from "../../components/Form/InputBox";
import { useState } from "react";
import { userData } from "@/data/UserData";

const EditProfile = ({ navigation }) => {
  const [email, setEmail] = useState(userData?.email);
  const [name, setName] = useState(userData?.name);
  const [address, setAddress] = useState(userData?.address);
  const [city, setCity] = useState(userData?.city);
  const [phone, setPhone] = useState(userData?.phone_no);
  const [profile, setProfile] = useState(userData?.profilePic);

  //function to handle login btn
  const handleUpdateBtn = () => {
    if (!name || !email || !address || !city || !phone) {
      return alert("Please fill in all the required fields.");
    }

    alert("Profile updated successfully");
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={userData?.profilePic} style={styles.image} />
        <TouchableOpacity style={styles.profilePicUpdateBtn}>
          <Text style={styles.profilePicUpdateBtnText}>Update Profile Pic</Text>
        </TouchableOpacity>
      </View>
      <InputBox autoComplete={"name"} value={name} setValue={setName} />
      <InputBox autoComplete={"email"} value={email} setValue={setEmail} />
      <InputBox
        autoComplete={"address"}
        value={address}
        setValue={setAddress}
      />
      <InputBox autoComplete={"city"} value={city} setValue={setCity} />
      <InputBox
        autoComplete={"phone"}
        value={phone}
        setValue={setPhone}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdateBtn}>
        <Text style={styles.updateBtnText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  profilePicUpdateBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicUpdateBtnText: {
    color: "#24a1ef",
  },
  userIcon: {
    fontSize: 70,
    marginBottom: 20,
    alignSelf: "center",
  },

  updateBtn: {
    backgroundColor: "#24a1ef",
    width: "80%",
    height: 30,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  updateBtnText: {
    color: "#ffffff",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  loginTextCont: {
    alignSelf: "center",
    marginTop: 10,
  },
  loginText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
export default EditProfile;
