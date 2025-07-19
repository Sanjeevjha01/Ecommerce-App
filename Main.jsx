import { Text, View, ActivityIndicator } from "react-native";
import { NavigationIndependentTree } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CommonActions } from '@react-navigation/native';
import Home from './screens/Home';
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart"
import Categories from "./screens/Categories";
import Profile from "./screens/Profile";
import Checkout from "./screens/Checkout";
import Payment from "./screens/Payment";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Notification from "./screens/Account/Notification";
import EditProfile from "./screens/Account/EditProfile";
import MyOrder from "./screens/Account/MyOrder";
import Dashboard from "./screens/Admin/Dashboard";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logoutUser, loadUserFromStorage } from "@/redux/features/auth/userActions";

//for routes
const Stack = createNativeStackNavigator();


export default function Main() {
    const [isInitializing, setIsInitializing] = useState(true);
    const navigationRef = useRef();
    const dispatch = useDispatch();

    // Get auth state from Redux store
    const { user, isAuth, loading, token, error } = useSelector((state) => state.user);


    // Debug: Log Redux state changes
    useEffect(() => {
        ({
            isAuth,
            user: user ? "User exists" : "No user",
            token: token ? "Token exists" : "No token",
            loading,
            error: error || "No error"
        });
    }, [isAuth, user, token, loading, error]);

    // Initialize authentication state on app load (only once)
    useEffect(() => {
        const initializeAuth = async () => {
            try {

                const rawData = await AsyncStorage.getItem("@auth");

                if (rawData) {
                    const parsedData = JSON.parse(rawData);

                    // Check for required fields
                    if (parsedData?.token && parsedData?.user) {
                        // Check if token is expired
                        try {
                            const tokenPayload = JSON.parse(atob(parsedData.token.split('.')[1]));
                            const isTokenExpired = tokenPayload.exp * 1000 < Date.now();

                            if (!isTokenExpired) {

                                // First load user data from storage (immediate auth)
                                dispatch(loadUserFromStorage(parsedData));

                                // Then fetch fresh user data from API
                                dispatch(getUserData());
                            } else {
                                await AsyncStorage.removeItem("@auth");
                                dispatch(logoutUser());
                            }
                        } catch (tokenError) {
                            await AsyncStorage.removeItem("@auth");
                            dispatch(logoutUser());
                        }
                    } else {
                        await AsyncStorage.removeItem("@auth");
                        dispatch(logoutUser());
                    }
                } else {
                    // Don't call logoutUser here, just let Redux maintain initial state
                }
            } catch (err) {
                await AsyncStorage.removeItem("@auth");
                dispatch(logoutUser());
            } finally {
                setIsInitializing(false);
            }
        };

        initializeAuth();
    }, [dispatch]); // Only dispatch in dependencies

    // Handle navigation based on auth state changes
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isInitializing && navigationRef.current) {
                clearInterval(interval);

                if (isAuth && user) {
                    // User is authenticated, navigate to Home
                    navigationRef.current.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    );
                } else {
                    // User is not authenticated, navigate to Login
                    navigationRef.current.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                    );
                }
            }
        }, 100);
        return () => clearInterval(interval)
    }, [isAuth, user, isInitializing]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (navigationRef.current?.isReady()) {
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);





    // Handle authentication errors
    useEffect(() => {
        if (
            error &&
            typeof error === 'string' &&
            error !== "No error" &&
            !error.toLowerCase().includes("already read") &&
            !isInitializing
        ) {
            AsyncStorage.removeItem("@auth");
            dispatch(logoutUser());
        }
    }, [error, isInitializing]);

    // Show loading screen while initializing or loading user data
    if (isInitializing) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff'
            }}>
                <ActivityIndicator size="large" color="#24a1ef" />
                <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>
                    Initializing...
                </Text>
            </View>
        );
    }

    // Show loading screen only when fetching user data (not during login)
    if (loading && isAuth) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff'
            }}>
                <ActivityIndicator size="large" color="#24a1ef" />
                <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>
                    Loading user data...
                </Text>
            </View>
        );
    }




    return (
        <NavigationIndependentTree
            ref={navigationRef}>
            <Stack.Navigator

                initialRouteName={isAuth ? "Home" : "Login"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                }}
            >


                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                />
                <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={{
                        headerBackVisible: false,
                        title: "Categories",
                        headerTitleStyle: {
                            fontSize: 24, fontWeight: "bold"
                        }
                    }}
                />
                <Stack.Screen
                    name="Checkout"
                    component={Checkout}
                    options={{
                        headerBackVisible: true,
                        title: "Checkout",
                        headerTitleStyle: {
                            fontWeight: 800,
                            fontSize: 17,
                        }
                    }}
                />
                <Stack.Screen
                    name="Payment"
                    component={Payment}
                    options={{
                        headerBackVisible: true,
                        title: "Payment",
                        headerTitleStyle: {
                            fontWeight: 800,
                            fontSize: 17,
                        }
                    }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        headerBackVisible: false,
                        title: "Cart",
                    }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: "Profile",
                    }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        headerBackVisible: true,
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                        headerBackVisible: true,
                        title: "Edit Profile",
                    }}
                />
                <Stack.Screen
                    name="MyOrder"
                    component={MyOrder}
                    options={{
                        title: "Your Order",
                        headerBackVisible: true,
                    }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        title: "Dashboard",
                        headerBackVisible: true,
                        headerStyle: {
                            backgroundColor: '#000000',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 18,
                        },
                        headerTintColor: '#ffffff'
                    }}
                />
            </Stack.Navigator>
        </NavigationIndependentTree >
    );
}