import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { cutText } from "../cards/ProductCard";
import { Link } from "react-router-dom";

const element = <FontAwesomeIcon icon={faCartShopping} className="text-xl" />;

/* eslint-disable react/prop-types */
const CartDropDown = ({ cartList }) => {
  return (
    <div
      className={`border-1 overflow-hidden flex-center justify-center flex-col absolute top-[40px] left-[-36px] w-[170px] bg-white text-black rounded-2xl py-[15px] px-[20px]`}
    >
      <hr />
      <div className="relative max-h-[225px] overflow-hidden flex flex-col justify-between items-center">
        {cartList.map((product) => (
          <Link
            className="z-999"
            to={`/category/${product.category}/product/${product.id}`}
            key={product.id}
          >
            <hr />
            <div className="z-11 text-black mb-[7px] mt-[7px] flex flex-row gap-[10px]">
              <img
                className="w-[35px] h-[30px] self-center"
                src={product.image}
              />
              <h2 className="text-[10px]">{cutText(product.title, 10)}</h2>
              <span className="bg-blue-200 rounded-full h-fit w-fit px-[7px]">
                {product.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <hr />
      {cartList.length > 0 ? (
        <Link
          to={"/cart"}
          className="border-1 border-solid border-[#6b7280] my-[10px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group w-full"
        >
          <span className="w-0 h-0 rounded bg-blue-400 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full h-full -z-12"></span>
          <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
            See All
          </span>
        </Link>
      ) : (
        <div className="flex flex-col items-center justify-center my-[10px]">
          {element}
          <p className="text-sm mt-[5px]">Cart is Empty...</p>
        </div>
      )}
      <hr />
      <hr />
    </div>
  );
};

export default CartDropDown;
