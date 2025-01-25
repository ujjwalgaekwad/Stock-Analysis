import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import conf from '../../conf/conf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { StockContext } from '../../context/StocksContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart() {
  const { searchData } = useContext(StockContext);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(6);

 
  const parseDate = (dateString) => new Date(dateString);

  const getPastDate = (months, weeks = 0, days = 0) => {
    const date = new Date();
    if (months) date.setMonth(date.getMonth() - months);
    if (weeks) date.setDate(date.getDate() - weeks * 7);
    if (days) date.setDate(date.getDate() - days);
    return date;
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://stock.indianapi.in/historical_data?stock_name=${searchData}&period=1m&filter=default`,
          {
            headers: {
              "X-Api-Key": conf.api_key,
            },
          }
        );
        const result = await response.json();

        
        const priceData = result.datasets?.find(
          (dataset) => dataset.metric === "Price"
        );

        if (!priceData) {
          throw new Error("Price data not found in API response.");
        }

       
        const dates = [];
        const prices = [];
        priceData.values.forEach(([date, price]) => {
          dates.push(date);
          prices.push(parseFloat(price));
        });

       
        const filteredData = dates
          .map((date, index) => {
            const parsedDate = parseDate(date);
            const pastDate =
              timeRange === "week"
                ? getPastDate(0, 1)
                : timeRange === "day"
                ? getPastDate(0, 0, 1)
                : getPastDate(timeRange);
            if (parsedDate >= pastDate) {
              return { date, price: prices[index] };
            }
            return null;
          })
          .filter((item) => item !== null);

        // Set chart data
        const filteredDates = filteredData.map((item) => item.date);
        const filteredPrices = filteredData.map((item) => item.price);

        setChartData({
          labels: filteredDates,
          datasets: [
            {
              label: `Price (Last ${
                timeRange === "week"
                  ? "1 Week"
                  : timeRange === "day"
                  ? "1 Day"
                  : `${timeRange} Months`
              })`,
              data: filteredPrices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
            },
          ],
        });
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchData, timeRange]); 

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <div className="h-6 flex bg-gray-300 dark:bg-gray-600 rounded w-1/4 animate-pulse"></div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-center">
        {searchData
          ? searchData
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() +
                  word.slice(1).toLowerCase()
              )
              .join(" ")
          : ""}
      </h1>
      <div className="ml-4">
        <button
          onClick={() => setTimeRange(12)}
          className={`md:px-4 md:py-2 md:mx-2 mx-1 px-2 py-1 ${
            timeRange === 12
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-[#1a202c]"
          } rounded`}
        >
          1Yr
        </button>
        <button
          onClick={() => setTimeRange(6)}
          className={`md:px-4 md:py-2 md:mx-2 mx-1 px-2 py-1 ${
            timeRange === 6
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-[#1a202c]"
          } rounded`}
        >
          6M
        </button>
        <button
          onClick={() => setTimeRange(3)}
          className={`md:px-4 md:py-2 md:mx-2 mx-1 px-2 py-1 ${
            timeRange === 3
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-[#1a202c]"
          } rounded`}
        >
          3M
        </button>
        <button
          onClick={() => setTimeRange(1)}
          className={`md:px-4 md:py-2 md:mx-2 mx-1 px-2 py-1 ${
            timeRange === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-[#1a202c]"
          } rounded`}
        >
          1M
        </button>
        <button
          onClick={() => setTimeRange("week")}
          className={`md:px-3 md:py-2 md:mx-2 mx-1 px-2 py-1 ${
            timeRange === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-[#1a202c]"
          } rounded`}
        >
          1W
        </button>
        <button
          onClick={() => setTimeRange("day")}
          className={`md:px-4 md:py-2 md:mx-2 mx-1 px-2 py-1 ${
            timeRange === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-[#1a202c]"
          } rounded`}
        >
          1D
        </button>
      </div>

      <Line
        data={chartData}
        height={100}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Price",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default PriceChart;
