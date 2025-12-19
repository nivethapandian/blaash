import React, { useState } from "react";
import logo from "../assets/blaash_logo.png";
import revenue from "../assets/revenue.svg";
import image from "../assets/image.svg";
import oneClickPost from "../assets/one_click_post.svg";
import calender from "../assets/calender.svg";
import settings from "../assets/settings.svg";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import ListItem from "./LeftNavComponents/ListItem";
import DropdownItem from "./LeftNavComponents/DropdownItem";

export const LeftNav = () => {
  const [activeItem, setActiveItem] = useState(null); 
  const dropdownItems = [
    { icon: revenue, title: "Sub-item 1" },
  ];

  const handleItemClick = (itemTitle) => {
    setActiveItem(itemTitle === activeItem ? null : itemTitle);
  };

  return (
    <div className="h-full w-[265px] bg-[#27272f] rounded-lg flex flex-col gap-10">
      <div className="w-[250px] flex justify-between items-center mx-7 mt-5">
        <img src={logo} alt="blaash logo" width="90" height="30" />
        <div className="flex h-fit justify-center items-center bg-[#27272f] rounded-[100%] p-1">
          <button>
            <IoIosArrowDropleftCircle size={20} color="#FFFFFF" opacity={0.5}/>
          </button>
        </div>
      </div>

      <div className="max-w-full h-[600px] custom-scrollbar flex flex-col gap-4 overflow-y-auto ml-5">
        <ListItem
          icon={revenue}
          title="Revenue"
          isActive={activeItem === "Revenue"}
          onClick={() => handleItemClick("Revenue")} 
        />

        <DropdownItem
          icon={image}
          title="Shoppable Video"
          isActive={activeItem === "Shoppable Video"} 
          items={dropdownItems}
          onClick={() => handleItemClick("Shoppable Video")} 
        />
        <DropdownItem
          icon={image}
          title="Story"
          isActive={activeItem === "Story"} 
          items={dropdownItems}
          onClick={() => handleItemClick("Story")} 
        />
        <DropdownItem
          icon={image}
          title="Playlist Manager"
          isActive={activeItem === "Playlist Manager"} 
          items={dropdownItems}
          onClick={() => handleItemClick("Playlist Manager")} 
        />
        <ListItem
          icon={oneClickPost}
          title="One Click Post"
          isActive={activeItem === "One Click Post"} 
          onClick={() => handleItemClick("One Click Post")} 
        />
        <ListItem
          icon={calender}
          title="Calender"
          isActive={activeItem === "Calender"} 
          onClick={() => handleItemClick("Calender")} 
        />
        <ListItem
          icon={settings}
          title="Hire Influencer"
          isActive={activeItem === "Hire Influencer"} 
          onClick={() => handleItemClick("Hire Influencer")}
        />
      </div>
    </div>
  );
};
