/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import Slider from "react-slick";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    //slick-arrow slick-prev
    className="z-10 text-black absolute top-[120px] left-[10px] md:left-[50px]"
  >
    <img
      src="https://freepngimg.com/save/163768-arrow-left-free-photo/512x512"
      className="z-[10] w-[80px]"
      alt="Previous"
    />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    //slick-arrow slick-next
    className="text-black absolute top-[120px] right-[10px] md:right-[50px]"
  >
    <img
      src="https://freepngimg.com/save/163768-arrow-left-free-photo/512x512"
      className="rotate-180 w-[80px]"
      alt="Next"
    />
  </button>
);

const Carousel = ({ children }) => {
  var settings = {
    // arrows: false,
    dots: false,
    draggable: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // prevArrow: null,
    // nextArrow: null,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 430,
        settings: "unslick",
      },
    ],
  };
  return (
    // w-[55%] m-auto md:w-11/12
    <Slider
      className="w-3/4 sm:max-w-screen-2xl w-11/12 mb-[100px] border-2 rounded-xl"
      {...settings}
    >
      {children}
    </Slider>
  );
};
export default Carousel;
