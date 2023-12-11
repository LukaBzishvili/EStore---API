import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { Link } from "react-router-dom";
import CartPageCard from "../components/cards/CartPageCard";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState();
  const [productsPrice, setProductsPrice] = useState();
  const [shippingPrice, setShippingPrice] = useState();
  const [expressShippingPrice, setExpressShippingPrice] = useState();
  const [selectedShipping, setSelectedShipping] = useState("Normal Shipping");

  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }

  function handleSelectShipping(option) {
    setSelectedShipping(option);
    setOpen(false);
  }

  function getFullCost() {
    if (selectedShipping == "Normal Shipping") {
      setTotalPrice(productsPrice + shippingPrice);
    } else {
      setTotalPrice(productsPrice + expressShippingPrice);
    }
  }

  useEffect(() => {
    getFullCost();
    getTotalProductsPrice();
  }, [cart]);

  useEffect(() => {
    getFullCost();
  }, [selectedShipping]);

  useEffect(() => {
    setShippingPrice(Math.round(productsPrice * 0.1));
    setExpressShippingPrice(Math.round(productsPrice * 0.2));
    getFullCost();
  }, [productsPrice]);

  useEffect(() => {
    getTotalProductsPrice();
  }, []);

  function getTotalProductsPrice() {
    let totalPrice = 0;
    cart.forEach((element) => {
      totalPrice += element.count * element.price;
    });
    setProductsPrice(Math.round(totalPrice));
    setShippingPrice(Math.round(totalPrice * 0.1));
    setExpressShippingPrice(Math.round(totalPrice * 0.2));
  }

  return (
    <section className="max-w-screen-2xl m-auto flex flex-row items-center justify-center h-[600px]">
      <div className="flex flex-col items-center justify-center h-full p-[20px]">
        {cart.length > 0 ? (
          <div className="flex flex-row items-center justify-center h-full gap-[30px]">
            <div className="w-full m-auto flex flex-col items-center gap-[20px] h-[600px] overflow-y-scroll pb-[10px] px-[40px]">
              {cart.map((product) => (
                <CartPageCard key={product.id} product={product}></CartPageCard>
              ))}
            </div>
            <div className="relative w-full md:w-7/12 h-[500px] flex flex-col self-start items-center bg-[#fafafa] p-[20px]">
              <div className="w-full flex flex-col items-center justify-center">
                <h2 className="font-medium text-2xl">Summary</h2>
                <h3 className="font-bold text-lg flex w-full items-center justify-between mt-[20px] mb-[7px]">
                  SubTotal{" "}
                  <span className="font-semibold">${productsPrice}</span>
                </h3>
                <div className="w-full h-[1px] bg-gray-400"></div>
                <h3 className="font-bold text-lg flex w-full items-center justify-between mt-[20px] mb-[7px]">
                  Estimated Shipping Price{" "}
                  <span className="font-semibold">
                    $
                    {selectedShipping == "Normal Shipping"
                      ? shippingPrice
                      : expressShippingPrice}
                  </span>
                </h3>
                <div className="w-full h-[1px] bg-gray-400"></div>
              </div>
              <div className="self-start bg-white rounded-xl px-[10px] py-[8px] mt-[30px]">
                <button onClick={handleOpen}>{selectedShipping}</button>
                {open ? (
                  <ul className="flex flex-col gap-[10px] mt-[15px]">
                    <li className="border-y-2 py-[10px]">
                      <button
                        onClick={() => handleSelectShipping("Normal Shipping")}
                      >
                        Normal Shipping: ${shippingPrice}
                      </button>
                    </li>
                    <li className="">
                      <button
                        onClick={() => handleSelectShipping("Express Shipping")}
                      >
                        Express Shipping: ${expressShippingPrice}
                      </button>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="absolute bottom-[20px] w-full px-[20px] m-auto flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold flex w-full items-end justify-between">
                  Total:{" "}
                  <span className="font-sembold text-xl">${totalPrice}</span>
                </h2>
                <div className="w-full h-[1px] bg-gray-400"></div>
                <button className="self-center mt-[30px] bg-black text-white px-[10px] py-[8px]">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center w-[300px] text-center">
            <h2 className="text-3xl mb-[10px]">Your Cart is Empty!</h2>
            <p className="text-lg">
              go to the{" "}
              <Link to={`/`} className="text-xl underline">
                Main Page
              </Link>{" "}
              to see new products.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
