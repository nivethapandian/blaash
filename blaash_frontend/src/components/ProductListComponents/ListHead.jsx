import React, { useState } from "react";

export const ListHead = () => {
  const [selected, setSelected] = useState("");

  const handleRadioChange = (value) => {
    setSelected(selected === value ? "" : value); 
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="font-[500] text-sm leading-4 text-white">
          Thumbnail Title
        </span>
        <input
          className="h-[30px] w-full font-[500] rounded-lg text-sm leading-4  border border-white border-solid outline-none p-2"
          type="text"
          placeholder="Get Spoty in Style"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-[500] text-sm leading-4 text-white">
          Video Status
        </span>
        <div className="flex items-center gap-3">

          <div className="flex gap-1 h-full relative">
            <input
              type="radio"
              id="active"
              checked={selected === "active"}
              onChange={() => handleRadioChange("active")}
              className="appearance-none w-5 h-5 border-2 border-white rounded-full cursor-pointer checked:border-[#017EFA]  checked:after:h-3  checked:after:w-3 checked:after:absolute checked:after:inset-1 checked:after:bg-[#017EFA] checked:after:rounded-lg"
            />
            <label
              className="font-[500] text-sm leading-4 text-white"
              htmlFor="active"
            >
              Active
            </label>
          </div>

          <div className="flex gap-1 relative items-center">
              <input
                type="radio"
                id="inactive"
                checked={selected === "inactive"}
                onChange={() => handleRadioChange("inactive")}
                className="appearance-none w-5 h-5 border-2 border-white rounded-full cursor-pointer checked:border-[#017EFA]  checked:after:h-3  checked:after:w-3 checked:after:absolute checked:after:inset-1 checked:after:bg-[#017EFA] checked:after:rounded-lg"
              />
            </div>

            <label
              className="font-[500] text-sm leading-4 text-white"
              htmlFor="inactive"
            >
              InActive
            </label>
        </div>

      </div>
    </div>
  );
};
