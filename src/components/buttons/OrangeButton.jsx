const OrangeButton = ({ text, onclick }) => {
  return (
    <button
      onClick={onclick}
      className=" bg-[#EB6D20] text-white text-sm rounded-full px-[20px] py-[10px] cursor-pointer"
    >
      {text}
    </button>
  );
};

export default OrangeButton;
