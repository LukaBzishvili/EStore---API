import OrangeButton from "../buttons/OrangeButton";

const Input = ({ text }) => {
  return (
    <div className="w-1/2 flex flex-col px-[20px] sm:flex-row items-center justify-center sm:bg-white pl-[15px] py-[10px] rounded-full">
      <input
        className="w-full outline-0 text-black sm:bg-white rounded-full px-[10px] mb-[10px] py-[10px] sm:mb-[0]"
        placeholder="Drop your Email"
      />
      <div>
        <OrangeButton text={text}></OrangeButton>
      </div>
    </div>
  );
};

export default Input;
