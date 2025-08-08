import React, { useState, useContext } from "react";
import { Search } from "lucide-react";
import { StockContext } from "../../context/StocksContext";

function SearchBox() {
  const { setUpdateSearchData } = useContext(StockContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUpdateSearchData(inputValue); 
    } else {
      setUpdateSearchData("Tata Steel"); 
    }
  };

  return (
    <div className="lg:h-20 h-[4.5rem] lg:py-5 pt-4 pb-[1rem] flex space-x-2 md:w-72">
      <div className="w-full relative">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search stocks..."
            className="w-full pl-4 pr-10 py-2 border dark:bg-transparent border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
