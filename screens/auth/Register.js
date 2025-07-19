import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import InputBox from "../../components/Form/InputBox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/auth/userActions";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  //function to handle login btn
  const handleRegisterBtn = () => {
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone ||
      !answer ||
      !confirmPassword
    ) {
      return alert("Please fill in all the required fields.");
    }

    if (password != confirmPassword) {
      return alert("Password do not match");
    }
    if (password.length < 8) {
      return alert("Password must be  at least 8 character long.");
    }

    dispatch(
      registerUser({
        name,
        email,
        password,
        address,
        city,
        country,
        phone,
        answer,
      })
    ).then((result) => {
      if (result.success) {
        alert("Registration successful, Please Login");
        navigation.navigate("Login");
      } else {
        alert(result.message || "Registration failed");
      }
    });
  };

  //function to handle login text
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
      <View>
        <FontAwesome6 name="user-circle" style={styles.userIcon} />
      </View>
      <InputBox
        placeholder={"Enter your name"}
        autoComplete={"name"}
        value={name}
        setValue={setName}
      />
      <InputBox
        placeholder={"Enter your Email"}
        autoComplete={"Email"}
        value={email}
        setValue={setEmail}
      />
      <InputBox
        placeholder={"Enter your address"}
        autoComplete={"Address"}
        value={address}
        setValue={setAddress}
      />
      <InputBox
        placeholder={"Enter your city"}
        autoComplete={"City"}
        value={city}
        setValue={setCity}
      />
      <InputBox
        placeholder={"Enter your country"}
        autoComplete={"Country"}
        value={country}
        setValue={setCountry}
      />
      <InputBox
        placeholder={"Enter your mobile "}
        autoComplete={"Mobile"}
        value={phone}
        setValue={setPhone}
        keyboardType="numeric"
      />
      <InputBox
        placeholder={"Enter your favourite food"}
        autoComplete={"Answer"}
        value={answer}
        setValue={setAnswer}
      />
      <InputBox
        placeholder={"Password"}
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <InputBox
        placeholder={"Confirm Password"}
        secureTextEntry={true}
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegisterBtn}>
        <Text style={styles.loginBtnText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.loginTextCont}>
        Already a user ?
        <Text style={styles.loginText} onPress={handleLogin}>
          {" "}
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userIcon: {
    fontSize: 70,
    marginBottom: 20,
    alignSelf: "center",
  },
  loginBtn: {
    backgroundColor: "#24a1ef",
    width: "80%",
    height: 30,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  loginBtnText: {
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

export default Register;
