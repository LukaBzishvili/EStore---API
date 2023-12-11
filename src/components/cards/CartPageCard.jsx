/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../App";
import { cutText } from "./ProductCard";
import { Link } from "react-router-dom";

const CartPageCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const [fullProductPrice, setFullProductPrice] = useState();

  useEffect(() => {
    calculatePrice();
  }, []);

  useEffect(() => {
    calculatePrice();
  }, [cart]);

  const handleRemove = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || "[]";

    const currentProduct = cartData.find((item) => item.id === product.id);

    if (currentProduct) {
      const updatedCart = cartData
        .map((item) =>
          item.id === product.id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count !== 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const handleIncrease = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || "[]";

    const currentProduct = cartData.find((item) => item.id === product.id);

    if (currentProduct) {
      const updatedCart = cartData.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const calculatePrice = () => {
    setFullProductPrice(Math.round(product.price * product.count));
  };

  return (
    <div className="w-full flex flex-col h-[180px] gap-[20px] p-[15px] bg-[#fafafa]">
      <div className="w-full flex flex-row h-[140px] gap-[20px]">
        <Link
          to={`/category/${product.category}/product/${product.id}`}
          className="flex items-center justify-center"
        >
          <img src={product.image} className="w-[120px] h-[120px]" />
        </Link>
        <div className="flex flex-row gap-[20px] items-center justify-center">
          <div className="flex flex-col items-center justify-center w-2/3">
            <h2 className="text-md text-left w-full font-semibold mb-2">
              {product.title}
            </h2>
            <p className="text-sm">{cutText(product.description, 90)}</p>
          </div>
          <div className="flex flex-column items-center justify-center w-1/4 gap-[20px]">
            <div className="border-2 flex flex-row items-center justify-center h-[40px]">
              <button className="px-[10px]" onClick={() => handleIncrease()}>
                +
              </button>
              <span className="border-x-2 h-full flex items-center justify-center px-[7px]">
                {product.count}
              </span>
              <button className="px-[10px]" onClick={() => handleRemove()}>
                -
              </button>
            </div>
            <div className="font-bold text-lg">${fullProductPrice}</div>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-[#e5e7eb]"></div>
    </div>
  );
};

export default CartPageCard;
