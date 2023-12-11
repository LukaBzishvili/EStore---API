/* eslint-disable react/prop-types */
import CategoryButton from "../components/buttons/CategoryButton";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navigation = ({ list }) => {
  const [active, setActive] = useState(null);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const pathname = decodeURIComponent(pathParts[2]);

  useEffect(() => {
    const index = list.indexOf(pathname);
    setActive(index > -1 && index < list.length ? index : undefined);
  }, [pathname, list]);

  function setActiveBtn(index) {
    setActive(index);
  }

  return (
    <nav className="w-full">
      <ul className="text-black flex flex-col items-start justify-start w-full md:flex-row md:items-center md:gap-[55px] md:pb-[20px]">
        {list.map((item, index) => (
          <li key={index}>
            <CategoryButton
              onclick={() => setActiveBtn(index)}
              active={index == active}
              text={item}
              category={item}
            ></CategoryButton>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
