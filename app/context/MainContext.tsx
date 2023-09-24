"use client";

import { createContext, useState } from "react";

export const MainContext = createContext<any>(undefined);

export default function MainProvider({ children }: any) {
  const [searchParameter, setSearchParameter] = useState({
    tag: "",
    startDate: "",
    endDate: "",
  });
  const [contentState, setContentState] = useState({
    author: "",
    comments: [],
    doc_id: "",
    edited_at: "",
    photo_captured_at: "",
    photo_uploaded_at: "",
    photo_url: undefined,
    public_id: undefined,
    tag: "",
    text: "",
  });
  const [loadingBg, setLoadingBg] = useState(false);
  return (
    <MainContext.Provider
      value={{
        searchParameter,
        setSearchParameter,
        contentState,
        setContentState,
        loadingBg,
        setLoadingBg,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
