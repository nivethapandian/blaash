import React from "react";

const ListItem = ({ icon, title, isActive, onClick }) => {
  return (
    <div
      className="flex gap-3 items-center px-3"
      style={{ minHeight: "40px", maxHeight: "40px", opacity: isActive ? 1 : 0.5 }}
      onClick={onClick} 
    >
      <img src={icon} alt={`${title} icon`} width="25px" height="25px" />
      <h3 className="text-white text-[14px] font-[500] leading-[16.59px]">
        {title}
      </h3>
    </div>
  );
};

export default ListItem;
