import React from "react";
import { VideoListItem } from "./VideoListItem";
import { useAuth } from "../../context/AuthContext";

export const VideoList = () => {
  const { selectedPlaylist } = useAuth();

  return (
    <div className="h-[60%] pt-2 flex flex-col">
      <span className="font-[500] text-sm leading-4 text-white">
        Product List
      </span>

      <div className="flex flex-col gap-2 h-full mt-2 overflow-y-auto custom-scrollbar">
        {selectedPlaylist?.videos.map((video) => (
          <VideoListItem
            key={video.videoId}
            title={video.title}
            id={video.videoId}
            thumbnail={video.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};
