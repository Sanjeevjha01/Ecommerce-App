import { View, FlatList, StatusBar } from "react-native";
import Layout from "../../components/Layout/Layout";
import Categories from "../../components/category/Categories";
import Banner from "../../components/category/banner/Banner";
import ProductCard from "../../components/Products/ProductCard";
import { ProductData } from "../../data/ProductData";
import Footer from "../../components/Layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserData,
  checkAuthStatus,
} from "@/redux/features/auth/userActions";
import { useNavigation } from "@react-navigation/native";

const Product = () => {
  const dispatch = useDispatch();
  const { isAuth, loading, user } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth && !user && !loading) {
      dispatch(getUserData());
    }
  }, [dispatch, isAuth, user, loading]);

  const handleSearch = (query) => {
    setSearchText(query);
    const results = ProductData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <FlatList
      data={filteredProducts.length ? filteredProducts : ProductData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard item={item} all navigation={navigation} />
      )}
      numColumns={2}
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 8 }}
    />
  );
};

export default Product;
