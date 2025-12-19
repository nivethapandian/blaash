import React from "react";
import { ListHead } from "./ProductListComponents/ListHead";
import { VideoList } from "./ProductListComponents/VideoList";
import update from '../assets/update.svg'

export const ProductsLists = () => {
  return (
    <div className="h-[457px] w-[29%] flex flex-col bg-[#27272F] py-1 px-3 rounded-lg">
      <ListHead />

      <VideoList />

      <div className="h-[15%] flex items-center justify-center ">
        <button className="flex h-[34px] bg-[#017EFA]  border border-[#017EFA] border-solid rounded-lg p-2 gap-1 items-center">
          <img src={update} alt="support" width="21" height="21" />
          <span className="font-[500] text-sm leading-4 text-white">
            Support Request
          </span>
        </button>
      </div>
    </div>
  );
};
