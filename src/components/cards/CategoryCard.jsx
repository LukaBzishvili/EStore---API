import { Link } from "react-router-dom";

const CategoryCard = ({ imgSrc, type }) => {
  return (
    <Link
      to={`/category/${type}`}
      className="relative w-[300px] h-[150px] bg-white flex items-center justify-center bg-neutral-300	rounded-xl text-xl font-normal	cursor-pointer mb-[60px]"
    >
      <img
        src={imgSrc}
        className="h-full m-auto opacity-50 filter blur-[0.1px]"
      />
      <h3 className="absolute">{type}</h3>
    </Link>
  );
};
export default CategoryCard;
