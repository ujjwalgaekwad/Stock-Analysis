import { useEffect, useState, createContext } from "react";
import conf from "../conf/conf";


export const StockContext = createContext();

export const StocksProvider = ({ children }) => {
  const [searchData, setUpdateSearchData] = useState("Tata Steel"); 
  const [stockName, setStockName] = useState(null); 
  const [stockPrice, setStockPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const fetchStockData = async () => {
    setIsLoading(true); 
    setError(null); 

    try {
      const stockDataName = await fetch(`https://stock.indianapi.in/stock?name=${searchData}`, {
        headers: {
          "X-Api-Key": conf.api_key,
        },
      });
      const stockData = await stockDataName.json();
      setStockName(stockData); 
      const stockDataPrice = await fetch(
        `https://stock.indianapi.in/historical_data?stock_name=${searchData}&period=1m&filter=default`,
        {
          headers: {
            "X-Api-Key": conf.api_key,
          },
        }
      );
      const stockPrice = await stockDataPrice.json();
      setStockPrice(stockPrice); 
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Failed to fetch stock data. Please try again later."); 
    } finally {
      setIsLoading(false); 
    }
  };

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
