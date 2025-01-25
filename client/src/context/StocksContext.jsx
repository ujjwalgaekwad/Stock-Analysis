import { useEffect, useState, createContext } from "react";
import conf from "../conf/conf";

// Create the StockContext
export const StockContext = createContext();

export const StocksProvider = ({ children }) => {
  const [searchData, setUpdateSearchData] = useState("Tata Steel"); // Default search value
  const [stockName, setStockName] = useState(null); // Holds stock name details
  const [stockPrice, setStockPrice] = useState(null); // Holds stock price details
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch stock data
  const fetchStockData = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      // Fetch stock name data
      const stockDataName = await fetch(`https://stock.indianapi.in/stock?name=${searchData}`, {
        headers: {
          "X-Api-Key": conf.api_key,
        },
      });
      const stockData = await stockDataName.json();
      setStockName(stockData); // Set stock name data

      // Fetch stock price data
      const stockDataPrice = await fetch(
        `https://stock.indianapi.in/historical_data?stock_name=${searchData}&period=1m&filter=default`,
        {
          headers: {
            "X-Api-Key": conf.api_key,
          },
        }
      );
      const stockPrice = await stockDataPrice.json();
      setStockPrice(stockPrice); // Set stock price data
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Failed to fetch stock data. Please try again later."); // Set error message
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Fetch data whenever `searchData` changes
  useEffect(() => {
    fetchStockData();
  }, [searchData]);

  return (
    <StockContext.Provider
      value={{
        searchData,
        setUpdateSearchData,
        stockName,
        stockPrice,
        isLoading,
        error,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};
