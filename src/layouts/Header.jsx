/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/E-commerce.png";
import { useContext, useState, useEffect } from "react";
import Navigation from "./Navigation";
import HeaderInput from "../components/other/HeaderInput";
import OrangeButton from "../components/buttons/OrangeButton";
import TransparentButton from "../components/buttons/TransparentButton";
import { CategoriesContext } from "../App";
import { Link } from "react-router-dom";
import { getCurrentUserName } from "../services/axios";
import { removeUser } from "../services/axios";
import { CartContext } from "../App";
import CartDropDown from "../components/other/CartDropDown";

//Header
const Header = () => {
  const cart = useContext(CartContext);

  const [isHamburgerActive, setHamburger] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [cartData, setCartData] = useState([]);
  const [isCartOpened, setCartOpened] = useState(false);
  const categoryNames = useContext(CategoriesContext);

  function setHamburgerActivity() {
    setHamburger(!isHamburgerActive);
  }

  useEffect(() => {
    const user = getCurrentUserName();
    setCurrentUserName(user);

    if (user !== null) {
      setIsLoggedin(true);
    }
  }, []);

  function logOut() {
    removeUser();
    setIsLoggedin(false);
    window.location.reload(false);
  }

  return (
    <header className="w-full px-[20px] h-[70px]  bg-[#b9e0f5] md:h-[160px]">
      <div className="max-w-screen-xl m-auto h-full flex flex-col justify-start">
        <div className="flex items-center justify-between pt-[20px]">
          <button
            className="mt-[7px] flex items-center flex-col justify-center md:hidden"
            onClick={() => setHamburgerActivity()}
          >
            <div className="w-[30px] h-[6px] bg-black rounded-xl mb-[3px]"></div>
            <div className="w-[30px] h-[6px] bg-black rounded-xl mb-[3px]"></div>
            <div className="w-[30px] h-[6px] bg-black rounded-xl"></div>
          </button>
          <Link to={"/"} className="cursor-pointer">
            <img src={logo} alt="logo" className="w-[190px]" />
          </Link>

          <HamburgerMenu isHamburgerActive={isHamburgerActive}>
            <Navigation list={categoryNames}></Navigation>
            <OrangeButton text={"Help"}></OrangeButton>
            <TransparentButton
              link={"/authorisation"}
              text={"Account"}
              imgSrc={"https://static.thenounproject.com/png/4038155-200.png"}
            ></TransparentButton>
            <TransparentButton
              text={"Shopping"}
              imgSrc={"https://cdn-icons-png.flaticon.com/512/2662/2662503.png"}
            ></TransparentButton>
          </HamburgerMenu>

          <div className="hidden md:flex flex-row w-full justify-between">
            <HeaderInput
              placeholder={"Search"}
              dropList={categoryNames}
            ></HeaderInput>
            <OrangeButton text={"Help"}></OrangeButton>
            <div className="z-10 group relative flex flex-row gap-[5px] items-center justify-center">
              <TransparentButton
                link={"/authorisation"}
                text={"Account"}
                imgSrc={"https://static.thenounproject.com/png/4038155-200.png"}
              ></TransparentButton>
              <div
                className={`hidden ${
                  isLoggedIn ? `group-hover:block` : ``
                } absolute top-[32px] left-0[-40px] w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-white border-r-[10px] border-r-transparent`}
              ></div>
              <div
                className={`hidden ${
                  isLoggedIn ? `group-hover:flex` : ``
                } flex-center justify-center flex-col absolute top-[40px] left-[-16px] w-[150px] h-full bg-white text-black rounded-2xl py-[45px] px-[20px]`}
              >
                <span className="text-center mb-[5px]">{currentUserName}</span>
                <hr className="w-full mb-[10px]" />
                {isLoggedIn ? (
                  <OrangeButton
                    onclick={logOut}
                    text={"Log Out"}
                  ></OrangeButton>
                ) : undefined}
              </div>
            </div>
            <div
              onClick={() => setCartOpened(!isCartOpened)}
              className="z-10 group relative flex flex-row gap-[5px] items-center justify-center"
            >
              <TransparentButton
                text={"Shopping"}
                imgSrc={
                  "https://cdn-icons-png.flaticon.com/512/2662/2662503.png"
                }
              ></TransparentButton>
              <div className="absolute right-[127px] top-1">
                <div className="absolute right-[-31px] top-0 cursor-pointer bg-blue-400 rounded-full w-[10px] h-[10px] flex items-center justify-center text-white text-xl p-[10px]">
                  {cart.cart.length}
                </div>
                {isCartOpened ? (
                  <CartDropDown cartList={cart.cart}></CartDropDown>
                ) : undefined}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full hidden md:flex items-center justify-center">
          <Navigation list={categoryNames}></Navigation>
        </div>
      </div>
    </header>
  );
};

//Hamburger Menu
const HamburgerMenu = ({ children, isHamburgerActive }) => {
  //bg-[#FFF9F3]
  return (
    <div
      className={`z-[12] absolute top-0 left-0 border-t-4 border-solid border-white w-[350px] h-full flex flex-col items-start justify-start pl-[50px] gap-[30px] pt-[20px] mt-[70px]  bg-[#b9e0f5] text-white  md:hidden /////////   transform transition-transform duration-300
      transform ${
        !isHamburgerActive ? "translate-x-[-400px]" : "translate-x-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Header;
