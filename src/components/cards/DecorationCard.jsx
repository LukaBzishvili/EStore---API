/* eslint-disable react/prop-types */
const DecorationCard = ({ imgSrc, title, description }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-[20px] bg-[#F5F6F8] px-[20px] py-[10px] w-[400px] rounded-sm">
      <img className="w-[100px]" src={imgSrc} />
      <div className="flex flex-col">
        <h2 className="text-lg">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
export default DecorationCard;
