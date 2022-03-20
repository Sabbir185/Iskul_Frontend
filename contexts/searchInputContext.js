import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

const SearchInputContext = (props) => {
    const [searchResult, setSearchResult] = useState();

    return (
        <SearchContext.Provider value={[searchResult, setSearchResult] }>
            {props.children}
        </SearchContext.Provider>
    );
};

export default SearchInputContext;


export const useSearchResult = () => {
    return useContext(SearchContext);
}