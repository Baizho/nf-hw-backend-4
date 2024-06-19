import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Signup } from "../pages/signup";
import { Signin } from "../pages/signin";
import ParentProviders from "../ParentProviders";
import { FavoriteSongsPage } from "../pages/FavoriteSongsPage";
import { LibraryPage } from "../pages/LibraryPage";
export const RouteList = () => {
  return (
    <ParentProviders>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/FavoriteSongsPage" element={<FavoriteSongsPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </ParentProviders>
  );
};
