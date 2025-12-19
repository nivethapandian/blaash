import React from "react";
import square from '../../assets/square.svg'
import defaultThumbnail from '../../assets/video_playlist_thumbnail.png'

export const VideoListItem = ({thumbnail, id, title}) => {
  return (
    <div className="min-h-[73px] bg-[#22222A] border border-[#FFFFFF] border-solid  flex rounded-[10px] overflow-hidden ">
      <div className="p-2 rounded-xl h-full w-[25%] object-cover flex items-center ">
        <img
          className="h-full w-full rounded-xl"
          src={thumbnail || defaultThumbnail}
          alt="thumbnail img"
          width={63}
          height={63}
        />
      </div>
      <div className="m-1 flex flex-col justify-between w-[60%] p-[2px] ">
        <span className="font-[500] text-sm leading-4 text-white">
          {title}
        </span>
        <span className="font-[500] text-[11px] leading-[13.04px] rounded-xl text-white w-fit px-[5px] py-[3px] bg-[#35373B] ">
          4:05:60
        </span>
        <span className="font-[500] text-sm leading-4 text-white">
          Products Attached : 5
        </span>
      </div>
      <div>
        <div className="bg-[#35373B] h-[35px] w-[35px] rounded-tr-[10px] rounded-bl-[10px] p-[10px] ">
          <img src={square} alt="square icon" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};
