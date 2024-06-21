import React, { useState } from "react";
import { Artistsection } from "../../components/Artistsection";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Footer } from "../../components/footer";
import CreatePlaylist from "./CreatePlaylist";

export const CreatePlaylistPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-black pt-28 md:pl-72 p-8">
        <CreatePlaylist />
        <Footer />
      </div>
    </div>
  );
};
