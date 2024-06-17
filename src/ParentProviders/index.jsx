import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { SongProvider } from "../context/SongContext";

export default function ParentProviders({ children }) {
  return (
    <AuthProvider>
      <SongProvider>{children}</SongProvider>
    </AuthProvider>
  );
}
