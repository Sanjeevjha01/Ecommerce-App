import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import InputBox from "../../components/Form/InputBox";
import { useState, useEffect } from "react";
import { loginUser } from "../../redux/features/auth/userActions";

// redux hooks
import { useDispatch, useSelector } from "react-redux";

// custom hooks
import { useReduxStateHook } from "../../hooks/customHook";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  const {
    token,
    user,
    loading: userLoading,
  } = useSelector((state) => state.user);

  const isAuthenticated = !!token && !!user && !userLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && attemptedLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isAuthenticated, navigation]);

  //function to handle login btn
  const handleLoginBtn = () => {
    if (!email || !password) {
      return alert("Please enter username and password");
    }
    if (password.length < 8) {
      return alert("Password must be  at least 8 character long.");
    }
    // Clear previous messages or errors
    dispatch({ type: "clearError" });
    dispatch({ type: "clearMessage" });

    setAttemptedLogin(true);
    // // Dispatch login
    dispatch(loginUser(email, password));
  };

  //function to handle register text
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View>
        <FontAwesome6 name="user-circle" style={styles.userIcon} />
      </View>
      <InputBox
        placeholder={"Username"}
        autoComplete={"Email"}
        value={email}
        setValue={setEmail}
      />
      <InputBox
        placeholder={"Password"}
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginBtn}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerTextCont}>
        Don't have an account ?
        <Text style={styles.registerText} onPress={handleRegister}>
          {" "}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
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
  registerTextCont: {
    alignSelf: "center",
    marginTop: 10,
  },
  registerText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
