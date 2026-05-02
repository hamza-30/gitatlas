import React, { useContext, useState } from "react";
import SearchContext from "./SearchContext";

function SearchContextProvider({ children }) {
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("searches")) || [];
  });

  return (
    <SearchContext.Provider value={{ recentSearches, setRecentSearches }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;

export function useSearchContext() {
  return useContext(SearchContext);
}
