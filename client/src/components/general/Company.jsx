import React, { useContext } from 'react'
import { StockContext } from '../../context/StocksContext'
import { SquareArrowOutUpRight, CircleArrowUp, Link } from 'lucide-react';

function Company() {
    const { stockName } = useContext(StockContext);

    if (!stockName) return null;

    return (
        <div>
            <div className='text-gray-800 dark:text-gray-100 md:p-2 bg-gray-100 dark:bg-transparent border dark:border-[#303030] rounded-md shadow-md'>
                {stockName ? <>
                    <div className='h-auto p-2 flex flex-col mb-8 rounded-md mt-2'>
                        <div className='w-[100%]'>
                            <div className='flex items-center py-4'>
                                <span className='mx-2 text-2xl font-semibold'>{stockName.companyName}</span>
                                <div className='flex items-center mx-2'>
                                    <span className='mx-1 mr-4 '> BSE : ₹ <span className='dark:text-gray-300'>{stockName.currentPrice.BSE}</span></span>
                                    <span className='mx-1 mr-4 '> NSE : ₹ <span className='dark:text-gray-300'>{stockName.currentPrice.NSE}</span></span>
                                    <CircleArrowUp size={16} className='text-green-500' />
                                    <span className='mx-1'><span>{stockName.percentChange}</span></span>
                                    <span className='ml-2 text-gray-500 text-sm'><span>{stockName.stockDetailsReusableData.date}</span></span>
                                </div>
                            </div>
                            < div className='flex items-center py-2'>
                                <span className='mx-1 text-blue-500 hover:text-blue-400'><Link size={16} /></span>
                                <span href="#" className='text-blue-500 hover:text-blue-400'>{stockName.industry}</span>
                                <h1 className='mx-2'>BSE</h1>
                                <SquareArrowOutUpRight size={16} className='text-blue-500 hover:text-blue-400' />

                            </div>
                        </div>
                        <div>
                            <ul className='flex justify-between flex-col md:flex-row gap-2'>
                                <li className='w-full md:w-[22%] md:py-2.5 py-2 px-4 dark:border-gray-600 border border-gray-300 rounded-md flex justify-between'>
                                    <span>Market Cap</span>
                                    <span>₹ {stockName.stockDetailsReusableData.marketCap}</span>
                                </li>
                                <li className='w-full md:w-[22%] md:py-2.5 py-2 px-4 dark:border-gray-600 border border-gray-300 rounded-md flex justify-between'>
                                    <span>High</span>
                                    <span>₹ {stockName.stockDetailsReusableData.high}</span>
                                </li>
                                <li className='w-full md:w-[22%] md:py-2.5 py-2 px-4 dark:border-gray-600 border border-gray-300 rounded-md flex justify-between'>
                                    <span>Low</span>
                                    <span>₹ {stockName.stockDetailsReusableData.low}</span>
                                </li>
                                <li className='w-full md:w-[22%] md:py-2.5 py-2 px-4 dark:border-gray-600 border border-gray-300 rounded-md flex justify-between'>
                                    <span>Close</span>
                                    <span>₹ {stockName.stockDetailsReusableData.close}</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                </> : <>
                    <div className="company-card border border-gray-300 rounded-lg p-4 m-4 shadow-md animate-pulse">
                        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
                    </div>
                </>}
            </div >
        </div >
    )
}

export default Company
