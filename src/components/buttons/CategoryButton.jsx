import { Link } from "react-router-dom";

const CategoryButton = ({ text, active, onclick, category }) => {
  return (
    <div className="mt-8 relative group w-full">
      <Link to={`/category/${category}`}>
        <button
          onClick={onclick}
          className="mb-[8px] text-xl font-normal sm:text-lg "
        >
          {text}
        </button>
        <span
          className={
            active
              ? "absolute -bottom-1 left-0 h-2 bg-[#EB6D20] w-1/2 rounded-full transition-all"
              : "absolute -bottom-1 left-0 w-0 h-2 bg-[#EB6D20] transition-all group-hover:w-1/2 rounded-full"
          }
        ></span>
      </Link>
    </div>
  );
};
export default CategoryButton;
