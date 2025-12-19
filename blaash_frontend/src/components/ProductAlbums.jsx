import React, { useContext, useState, useEffect } from "react";
import { Album } from "./ProductAlbumComponents/Album";
import { AuthContext } from "../context/AuthContext";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useUser } from "../context/UserContext";
import {SortableItem} from "../components/dnd/SortableItem"

const ProductAlbums = () => {
  const { playlists, updatePlaylistsInDB } = useContext(AuthContext);
  const { userEmail } = useUser();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (playlists && playlists.length > 0) {
      setAlbums(playlists);
    }
  }, [playlists]);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = albums.findIndex((album) => album.playlistId === active.id);
    const newIndex = albums.findIndex((album) => album.playlistId === over.id);
    const updatedAlbums = arrayMove(albums, oldIndex, newIndex);

    setAlbums(updatedAlbums);
    updatePlaylistsInDB(userEmail, updatedAlbums.map((album, index) => ({ ...album, position: index })));
  };



  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={albums.map((album) => album.playlistId)} strategy={verticalListSortingStrategy}>
        <div className="h-[457px] w-[70%] bg-[#27272f] p-5 rounded-lg flex gap-4 flex-wrap overflow-y-auto custom-scrollbar">
          {albums.length ? (albums.map((playlist) => (
            <SortableItem key={playlist.playlistId} id={playlist.playlistId}>
              <Album
                albumName={playlist.title}
                videos={playlist?.videos?.length}
                id={playlist.playlistId}
                thumbnail={playlist.thumbnail || "default-thumbnail.png"}
              />
            </SortableItem>
          ))) :<div className="w-full text-white text-2xl text-center">No albums available</div>}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ProductAlbums;
