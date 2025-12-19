import React, { memo, useCallback } from "react";
import videoList from "../../assets/video_list.svg";
import menu from "../../assets/menu.svg";
import { useAuth } from "../../context/AuthContext";

export const Album = memo(({ albumName, videos, id, thumbnail }) => {
  const { selectPlaylist, playlists, selectedPlaylist } = useAuth();
  
  const handleDoubleClick = useCallback(() => {
    const selected = playlists.find((playlist) => playlist.playlistId === id);
    selectPlaylist(selected);
  }, [playlists, id, selectPlaylist]);
  
  return (
    <div
      className="h-[144px] w-[221.67px] rounded-[25px] overflow-hidden cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      <div
        className="h-[85%] w-full flex flex-col justify-between pb-1"
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-end w-full">
          <div className="w-[35px] h-[35px] bg-[#35373B] rounded-tr-[25px] rounded-bl-[15px] p-[10px]">
            <img src={menu} alt="menu icon" width={21} height={21} />
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-[21px] bg-[#017EFA] h-[26px] rounded-tr-[30px] rounded-br-[30px]"></div>
          <span className="font-[500] text-sm leading-4 text-white">
            {albumName}
          </span>
        </div>
      </div>
      <div className="h-[15%] bg-gray-700 flex justify-center items-center py-2 gap-2">
        <img src={videoList} alt="video List icon" width={14} height={14} />
        <span className="font-[500] text-sm leading-4 text-white">
          {videos} Videos
        </span>
      </div>
    </div>
  );
});
