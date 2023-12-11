/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { cutText } from "./ProductCard";

const SuggestionCard = ({ imgSrc, title, price, category, id }) => {
  return (
    <Link
      to={`/category/${category}/product/${id}`}
      className="h-[270px] bg-white m-4 p-4 flex flex-col items-center justify-center w-[190px] border-4 rounded-xl cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
    >
      <img src={imgSrc} alt="product" className="h-[100px] mb-[15px]" />
      <div className="h-full flex flex-col items-center justify-between">
        <h3 className="text-lg">{cutText(title, 20)}</h3>
        <span className="w-full text-center py-[7px] px-[12px] rounded-full bg-blue-300">
          ${price}
        </span>
      </div>
    </Link>
  );
};
export default SuggestionCard;
