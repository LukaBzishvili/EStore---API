import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DropDown from "./DropDown";
import { getData } from "../../services/axios";
import { Link } from "react-router-dom";

const HeaderInput = ({ placeholder, dropList }) => {
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("products");
  const [products, setProducts] = useState([]);
  const [searchedProds, setSearchedProds] = useState([]);
  const [isFound, setFound] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData(category)
      .then((data) => {
        setProducts(data);
        setSearchedProds(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
        setLoading(false);
      });
    //////////////////////////////////////////////
    document.addEventListener("click", clearSearch);

    return () => {
      document.removeEventListener("click", clearSearch);
    };
  }, []);

  function clearSearch() {
    setFound(false);
  }

  const getValue = async (e) => {
    setInputValue(e.target.value);
    if (inputValue.length > 3) {
      const foundProds = products.filter((product) =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (foundProds.length > 0) {
        setSearchedProds(foundProds);
        setFound(true);
      } else {
        setFound(false);
      }
    } else {
      setFound(false);
    }
    console.log(isFound);
  };

  const handleDropDownChange = async (selectedValue) => {
    setCategory(selectedValue);
    if (selectedValue == "all") {
      setCategory("products");

      try {
        const data = await getData(`products`);
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    } else {
      setCategory(selectedValue);

      try {
        const data = await getData(`products/category/${selectedValue}`);
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }
  };

  return (
    <div className="relative w-2/4 mx-[20px] bg-blue-100 px-[15px] py-[7px] rounded-full items-center flex">
      <div className="w-full items-center flex">
        <DropDown
          list={dropList}
          onSelectChange={handleDropDownChange}
        ></DropDown>
        <input
          className="w-full pl-[10px] bg-blue-100 py-[4px] rounded-xl outline-0"
          placeholder={placeholder}
          onChange={getValue}
          value={inputValue}
        />
        <button>
          <FaSearch className="pl-[10px] text-2xl" />
        </button>
      </div>
      {isFound ? (
        <div className="absolute z-10 flex flex-col bg-white w-11/12 h-[100px] top-[45px] left-[15px] rounded-b-3xl h-max border-black border-solid border-2 border-t-0">
          {searchedProds.map((product) => (
            <Link
              to={`category/${product.category}/product/${product.id}`}
              className="w-full flex flex-row items-center gap-[10px] border-t-4 p-[30px]"
              key={product.id}
            >
              <img src={product.image} className="w-2/12" />
              <h2>{product.title}</h2>
            </Link>
          ))}
        </div>
      ) : undefined}
    </div>
  );
};

export default HeaderInput;
