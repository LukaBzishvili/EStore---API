import { Link } from "react-router-dom";

const MainCategoryCard = ({ imgSrc, type }) => {
  return (
    <Link
      to={`/category/${type}`}
      className="p-[20px] relative w-full h-[350px] bg-white flex items-center justify-center bg-neutral-300 rounded-xl text-xl font-normal	cursor-pointer"
    >
      <img
        src={imgSrc}
        className="h-full m-auto opacity-50 filter blur-[0.1px]"
      />
      <h3 className="absolute text-5xl">{type}</h3>
    </Link>
  );
};

export default MainCategoryCard;
