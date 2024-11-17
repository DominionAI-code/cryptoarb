import React, { useState } from "react";
import UseAxios from "../hooks/UseAxios";
import { Link } from 'react-router-dom';

const FilterMarket = () => {
  const { response } = UseAxios('coins/markets?vs_currency=usd');

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [volumeRange, setVolumeRange] = useState({ min: '', max: '' }); // Volume range state with min and max
  const [marketCap, setMarketCap] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(1000);
  const [filteredCoins, setFilteredCoins] = useState([]);

  // Function to filter coins based on user input
  const filterCoins = () => {
    const filtered = response ? response.filter(coin => {
      // Price range filter
      const inPriceRange = priceRange.min && priceRange.max
        ? coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
        : true;

      // Volume range filter
      const inVolumeRange = volumeRange.min && volumeRange.max
        ? coin.total_volume >= volumeRange.min && coin.total_volume <= volumeRange.max
        : true;

      // Market cap filter
      const meetsMarketCap = marketCap ? coin.market_cap >= marketCap : true;

      return inPriceRange && inVolumeRange && meetsMarketCap;
    }) : [];

    setFilteredCoins(filtered);
  };

  return (
    <section className="mt-10 p-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-8 text-gray-300 text-center lg:text-left">
        Filter Your Desired <span className="text-yellow-600">Cryptocurrencies</span>
      </h1>

      {/* Price Range Inputs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label className="text-lg sm:text-xl text-gray-300 mb-2 sm:mb-0">Price Range ($):</label>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded mb-4 sm:mb-0 sm:mx-4 sm:px-4 py-2"
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <input
            className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded mb-4 sm:mb-0 sm:px-4 py-2"
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>

      {/* Volume Range Inputs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label className="text-lg sm:text-xl text-gray-300 mb-2 sm:mb-0">Volume Range (24h):</label>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded mb-4 sm:mb-0 sm:mx-4 sm:px-4 py-2"
            type="number"
            placeholder="Min"
            value={volumeRange.min}
            onChange={(e) => setVolumeRange({ ...volumeRange, min: e.target.value })}
          />
          <input
            className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded mb-4 sm:mb-0 sm:px-4 py-2"
            type="number"
            placeholder="Max"
            value={volumeRange.max}
            onChange={(e) => setVolumeRange({ ...volumeRange, max: e.target.value })}
          />
        </div>
      </div>

      {/* Market Cap Input */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label className="text-lg sm:text-xl text-gray-300 mb-2 sm:mb-0">Market Cap:</label>
        <input
          className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded sm:mx-4 sm:px-4 py-2"
          type="number"
          value={marketCap}
          placeholder="Market Cap"
          onChange={(e) => setMarketCap(e.target.value)}
        />
      </div>

      {/* Transaction Amount Input */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label className="text-lg sm:text-xl text-gray-300 mb-2 sm:mb-0">Transaction Amount ($):</label>
        <input
          className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded sm:mx-4 sm:px-4 py-2"
          type="number"
          value={transactionAmount}
          placeholder="$1000"
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
      </div>

      {/* Filter Button */}
      <button 
        onClick={filterCoins} 
        className="bg-yellow-700 text-white px-6 py-2 rounded-lg mb-6 hover:bg-yellow-900 hover:text-white w-full sm:w-auto"
      >
        Generate Data
      </button>

      {/* Display Filtered Coins */}
      <div className="mt-8">
        {filteredCoins.length > 0 ? (
          filteredCoins.map(coin => (
            <div key={coin.id} className="mb-7 p-4 bg-slate-300 rounded-lg shadow-md">
              <div className="text-lg">
                <p>{coin.name} (${coin.current_price})</p>
                <p>Click to see arbitrage details</p>
                {/* Use Link to navigate to CoinDetails */}
                <Link 
                  to={`/coin/${coin.id}`} 
                  state={{ coin, transactionAmount }}  // Pass coin data and transactionAmount via state
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-yellow-600 text-center">No coins match the filter criteria.</p>
        )}
      </div>
    </section>
  );
};

export default FilterMarket;