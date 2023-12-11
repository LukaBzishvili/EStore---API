/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../services/LoadingScreen";
import SuggestionCard from "../components/cards/SuggestionCard";
import { SpecificCategoryDataContext } from "../App";
import { filterProductsByCategory } from "./Category";
import { CartContext } from "../App";
import { getCurrentUserName } from "../services/axios";

const Product = () => {
  const sameCategoryProducts = useContext(SpecificCategoryDataContext);
  //Cart Context
  const { cart, setCart } = useContext(CartContext);

  const { category, id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategoryProducts, setCurrentCategoryProducts] = useState([]);

  useEffect(() => {
    const suggestions = filterProductsByCategory(
      sameCategoryProducts,
      category
    );

    setProduct(suggestions.find((singleProd) => String(singleProd.id) == id));
    setCurrentCategoryProducts(
      suggestions.filter((prod) => String(prod.id) !== id)
    );

    // if (product !== undefined) {
    setIsLoading(false);
    // }
  }, [id]);

  const addToCart = () => {
    const userName = getCurrentUserName();
    if (userName) {
      const cartData = JSON.parse(localStorage.getItem("cart")) || "[]";

      const isProductInCart = cartData.some((item) => item.id === product.id);

      if (!isProductInCart) {
        const updatedCart = [...cartData, { ...product, count: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      } else {
        const updatedCart = cartData.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    } else {
      console.log("Please Log In");
    }
  };

  return (
    <div className="max-w-screen-2xl w-full m-auto flex flex-col items-center justify-center">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="w-full flex flex-col gap-[110px] p-[50px] xl:flex-row">
            <div className="w-full h-[400px] bg-white border-4 border-solid border-amber-450 rounded-xl flex items-center justify-center xl:w-2/4">
              <img
                src={product.image}
                className="w-[200px]"
                alt={product.title}
              />
            </div>
            <div className="h-full w-3/4 flex flex-col gap-[30px]">
              <h2 className="text-4xl font-semibold">{product.title}</h2>
              <p className="w-full text-base text-left text-xl">
                {product.description}
              </p>
              <span className="w-full font-semibold text-left text-lg w-min px-[7px] py-[9px] cursor-pointer bg-black text-white rounded-xl">
                ${product.price}
              </span>
              <button
                onClick={addToCart}
                className="w-[130px] p-[10px] inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="max-w-screen-2xl w-full text-start border-b-4 pb-[10px] px-[50px]">
            <h3>Products from same category</h3>
          </div>
          <div className="flex flex-row flex-wrap w-full max-w-screen-2xl px-[35px] items-center justify-start">
            {
              //currentCategoryProducts.length <= 5 ? (
              currentCategoryProducts.map((product) => (
                <SuggestionCard
                  key={product.id}
                  id={product.id}
                  imgSrc={product.image}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                ></SuggestionCard>
              ))
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
