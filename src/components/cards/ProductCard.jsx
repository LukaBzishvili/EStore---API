/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function cutText(text, length) {
  if (text.length > length) {
    return `${text.substring(0, text.length - (text.length - length))}...`;
  } else {
    return text;
  }
}

const ProductCard = ({ imgSrc, title, price, description, category, id }) => {
  return (
    <Link
      to={`/category/${category}/product/${id}`}
      className="justify-evenly w-3/4 h-[590px] sm:h-max py-[10px] px-[15px] mx-auto sm:my-[30px] bg-white sm:w-[312px] flex flex-col items-center sm:justify-center border-4 rounded-xl cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transform transition duration-500 hover:scale-105"
    >
      <img src={imgSrc} alt="product" className="h-[250px] mb-[15px]" />
      <div className="gap-[10px] sm:gap-[0] h-[180px] flex flex-col items-start justify-between">
        <h3 className="text-lg sm:text-xl">{cutText(title, 40)}</h3>
        <h2>
          <span className="text-md sm:text-lg mb-[12px]">Category: </span>
          {category}
        </h2>
        <p className="sm:mb-[10px]">{cutText(description, 40)}</p>
        <span className="w-full text-center py-[7px] px-[12px] rounded-full bg-blue-300">
          ${price}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
