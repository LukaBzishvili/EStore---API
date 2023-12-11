import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Main from "./pages/Main";
import Product from "./pages/Product";
import Category from "./pages/Category";
import {
  getData,
  fetchUsers,
  getAllCategories,
  getAllProducts,
  getCart,
} from "./services/axios";
import { useState, createContext, useEffect } from "react";
import Authorisation from "./pages/Authorisation";
import LoadingScreen from "./services/LoadingScreen";
import ContactUs from "./layouts/ContactUs";
import Footer from "./layouts/Footer";
import Cart from "./pages/Cart";
// import Test from "./components/test/Test";

export const ProductsContext = createContext();
export const CategoriesContext = createContext();
export const SpecificCategoryDataContext = createContext();
export const UsersDataContext = createContext();
export const CartContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  const specificCategory = `products/category/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        const categoriesData = await getAllCategories();
        const usersData = await fetchUsers();
        const cartData = getCart();
        if (!cartData) {
          localStorage.setItem("cart", JSON.stringify([]));
        }

        setData(productsData);
        setCategories(categoriesData);
        setUsers(usersData);
        setCart(cartData);

        const specificCategoryPromises = categoriesData.map((categoryItem) =>
          getData(`${specificCategory}${categoryItem}`)
        );

        const specificCategoryData = await Promise.all(
          specificCategoryPromises
        );

        setCategory(specificCategoryData);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <ProductsContext.Provider value={data}>
        <CategoriesContext.Provider value={categories}>
          <SpecificCategoryDataContext.Provider value={category}>
            <UsersDataContext.Provider value={users}>
              <Router>
                {!isDataLoaded ? (
                  <LoadingScreen></LoadingScreen>
                ) : (
                  <>
                    <Header></Header>
                    <Routes>
                      <Route path="/" element={<Main />} />
                      <Route
                        path="/category/:category"
                        element={<Category />}
                      />
                      <Route
                        path="/category/:category/product/:id"
                        element={<Product />}
                      />
                      <Route
                        path="/authorisation"
                        element={<Authorisation />}
                      />
                      <Route path="/cart" element={<Cart />} />
                    </Routes>
                    <ContactUs></ContactUs>
                    <Footer></Footer>
                  </>
                )}
              </Router>
            </UsersDataContext.Provider>
          </SpecificCategoryDataContext.Provider>
        </CategoriesContext.Provider>
      </ProductsContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
