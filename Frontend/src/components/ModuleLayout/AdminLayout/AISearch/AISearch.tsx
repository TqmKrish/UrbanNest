import React, { useState } from "react";
import "./AISearch.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../../../../Redux/Searchbar/Searchbar";

interface AISearchProps {
  parent: string;
}

const AISearch: React.FC<AISearchProps> = ({ parent }) => {
  const [value, setValue] = useState<string>("");
  const searchValue = useSelector((state: any) => state.search.value);
  const dispatch = useDispatch();

  const updateValue = (event: any) => {
    setValue(event?.target.value);
    if (event.target.value === "" && searchValue !== "") {
      dispatch(updateSearch(value));
    }
  };

  const AISearch = () => {
    dispatch(updateSearch(value));
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="search-bar"
        value={value}
        onChange={updateValue}
        className="block w-full pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search your dream properties with our latest AI..."
      />
      <div
        className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
        onClick={AISearch}
      >
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default AISearch;
