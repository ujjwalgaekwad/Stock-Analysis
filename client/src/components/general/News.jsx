import React, { useContext, useState, useEffect } from 'react';
import { StockContext } from '../../context/StocksContext';
import conf from '../../conf/conf';

function News() {
    const [recentNews, setRecentNews] = useState([]);
    const [visibleNewsCount, setVisibleNewsCount] = useState(3);
    const [loading, setLoading] = useState(false);
    const { searchData } = useContext(StockContext);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://stock.indianapi.in/stock?name=${searchData}`, {
                    headers: {
                        'X-Api-Key': conf.api_key
                    }
                });
                const stockData = await response.json();
                setRecentNews(stockData.recentNews || []);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        if (searchData) {
            fetchNews();
        }
    }, [searchData]);

    const loadMoreNews = () => {
        setVisibleNewsCount((prevCount) => prevCount + 3);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Recent News</h2>
            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-transparent border rounded-lg shadow-md p-4 animate-pulse"
                        >
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentNews.slice(0, visibleNewsCount).map((newsItem, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-transparent border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
                                {newsItem.headline}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{newsItem.date}</p>
                            <a
                                href={newsItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {!loading && recentNews.length > visibleNewsCount && (
                <div className="mt-4 text-center">
                    <button
                        onClick={loadMoreNews}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Load More
                    </button>
                </div>
            )}

            {!loading && recentNews.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                    <p>No news available for the selected stock.</p>
                </div>
            )}
        </div>
    );
}

export default News;
