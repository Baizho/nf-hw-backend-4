import React, { useState } from "react";
import { Artistsection } from "../../components/Artistsection";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Footer } from "../../components/footer";
import CreateSong from "./CreateSong";

export const CreateSongPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen text-gray-300">
      <Header setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-black pt-28 md:pl-72 p-8">
        <CreateSong />
        <Footer />
      </div>
    </div>
  );
};
