import Layout from "@/components/Layout/Layout";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, getUserData } from "@/redux/features/auth/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Get user data from Redux store
  const {
    user,
    auth,
    loading: userLoading,
    token,
  } = useSelector((state) => state.user);

  // Fetch user data if we have token but no user data
  useEffect(() => {
    if (token && !user && !userLoading) {
      dispatch(getUserData());
    }
  }, [dispatch, token, user, userLoading]);

  // Show loading spinner while user data is being fetched
  if (userLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#24a1ef" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Show loading if logging out
  if (isLoggingOut) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#ef4524" />
        <Text style={styles.loadingText}>Logging out...</Text>
      </View>
    );
  }

  // If we don't have user data, show error state
  if (!user) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Unable to load user data</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => dispatch(getUserData())}
        >
          <Text style={styles.retryBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Function to handle notification btn
  const handleNotification = () => {
    navigation.navigate("Notification");
  };

  // Function to handle myOrder btn
  const handleMyOrder = () => {
    navigation.navigate("MyOrder", { id: user.id || user._id });
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: performLogout,
      },
    ]);
  };

  // Perform the actual logout
  const performLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Clear AsyncStorage
      await AsyncStorage.removeItem("@auth");

      // Dispatch logout action
      dispatch(logoutUser());

      // redirect to login screen, after successfully loging out
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture - Shows user's profile picture or default placeholder */}
        {user.profilePic ? (
          <Image source={{ uri: user.profilePic }} style={styles.image} />
        ) : (
          <View style={styles.defaultImageContainer}>
            <View style={styles.defaultImage}>
              <Text style={styles.defaultImageText}>
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
          </View>
        )}

        {/* User Information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Name: </Text>
            {user.name || "Not provided"}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Email: </Text>
            {user.email || "Not provided"}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Address: </Text>
            {user.address || "Not provided"}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>City: </Text>
            {user.city || "Not provided"}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Phone: </Text>
            {user.phone_no || user.phone || "Not provided"}
          </Text>
        </View>

        <View style={styles.accountCont}>
          <View style={styles.accSett}>
            <Text style={styles.accText}>Account Settings</Text>
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate("EditProfile", { id: user.id || user._id })
            }
          >
            <View style={styles.menuItemContent}>
              <AntDesign name="edit" style={styles.icon} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleMyOrder}>
            <View style={styles.menuItemContent}>
              <Octicons name="list-unordered" style={styles.icon} />
              <Text style={styles.menuItemText}>My Orders</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleNotification}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="notifications" style={styles.icon} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
          </TouchableOpacity>

          {/* Only show admin panel if user is admin */}
          {user.role === "admin" && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate("Dashboard", { id: user.id || user._id })
              }
            >
              <View style={styles.menuItemContent}>
                <MaterialIcons
                  name="admin-panel-settings"
                  style={styles.icon}
                />
                <Text style={styles.menuItemText}>Admin Panel</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  image: {
    marginTop: "20%",
    marginBottom: 20,
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  defaultImageContainer: {
    marginTop: "20%",
    marginBottom: 20,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#24a1ef",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultImageText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  userInfoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    lineHeight: 22,
  },
  label: {
    fontWeight: "600",
    color: "#24a1ef",
  },
  accountCont: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  accSett: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 15,
  },
  accText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 15,
    fontSize: 20,
    color: "#24a1ef",
    width: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "transparent",
  },
  logoutBtn: {
    backgroundColor: "#ef4524",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4524",
    textAlign: "center",
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: "#24a1ef",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Profile;
