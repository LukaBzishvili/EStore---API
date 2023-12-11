/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 text-black absolute top-[290px] left-[-30px] md:left-[-50px]"
  >
    <img
      src="https://freepngimg.com/save/163768-arrow-left-free-photo/512x512"
      className="z-[10] w-[20px]"
      alt="Previous"
    />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-black absolute top-[290px] right-[-30px] md:right-[-50px]"
  >
    <img
      src="https://freepngimg.com/save/163768-arrow-left-free-photo/512x512"
      className="rotate-180 w-[20px]"
      alt="Next"
    />
  </button>
);

const Carousel = ({ children }) => {
  var settings = {
    dots: false,
    draggable: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 430,
        settings: "unslick",
      },
    ],
  };
  return (
    <Slider className="w-3/4 sm:max-w-screen-2xl w-11/12" {...settings}>
      {children}
    </Slider>
  );
};

export default Carousel;
