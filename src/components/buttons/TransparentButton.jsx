import { Link } from "react-router-dom";

const TransparentButton = ({ imgSrc, text, link }) => {
  return (
    <Link
      to={link}
      className="mx-[30px] bg-transparent text-black flex flex-row gap-[5px] items-center justify-center"
    >
      <img src={imgSrc} alt="image" className="w-[30px]" />
      {text}
    </Link>
  );
};

export default TransparentButton;
