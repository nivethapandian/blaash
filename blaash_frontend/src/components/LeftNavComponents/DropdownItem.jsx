import React, { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const DropdownItem = ({ icon, title, items, isActive, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsOpen(false);
    }
  }, [isActive]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col gap-2 px-3 ${
        isActive
          ? "border border-y-[#017EFA] border-r-[#222229]  border-l-[#017EFA] bg-[#222229] rounded-tl-lg rounded-bl-lg"
          : "border-none opacity-50"
      }`}
    >
      <div
        className="flex gap-3 items-center h-10 justify-between cursor-pointer"
        onClick={() => {
          onClick();
          toggleDropdown();
        }}
      >
        <div className="flex gap-3 items-center h-10">
          <img src={icon} alt={`${title} icon`} width="25px" height="25px" />
          <h3 className="text-[#828293] text-[14px] font-[500] leading-[16.59px]">
            {title}
          </h3>
        </div>
        <MdKeyboardArrowUp
          size={20}
          className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
          color="#FFFFFF" opacity={0.5}
        />
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 m-2 p-2 rounded-lg h-8 bg-white items-center"
            >
              <h3 className="text-[#828293] text-[14px] font-[500] leading-[16.59px]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
