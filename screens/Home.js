import { View, FlatList, StatusBar } from "react-native";
import Layout from "../components/Layout/Layout";
import Categories from "../components/category/Categories";
import Banner from "../components/category/banner/Banner";
import ProductCard from "../components/Products/ProductCard";
import Header from "@/components/Layout/Header";
import { ProductData } from "../data/ProductData";
import Footer from "../components/Layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getUserData,
  checkAuthStatus,
} from "@/redux/features/auth/userActions";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth && !user && !loading) {
      dispatch(getUserData());
    }
  }, [dispatch, isAuth, user, loading]);

  return (
    <Layout>
      <FlatList
        data={ProductData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <StatusBar />
            <Header />
            <Categories />
            <Banner />
          </>
        }
      />
    </Layout>
  );
};

export default Home;
