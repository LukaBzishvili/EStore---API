import { useState } from "react";

const DropDown = ({ list, onSelectChange }) => {
  const [activeBar, setActiveBar] = useState(1);

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setActiveBar(selectedIndex + 1);

    onSelectChange(event.target.value);
  };

  return (
    <div className="hidden pr-[10px] md:flex ">
      <select
        className="rounded-xl px-[7px] py-[4px]"
        onChange={handleSelectChange}
      >
        <option value="all">All Categories</option>
        {list.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
