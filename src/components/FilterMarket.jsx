import React, { useState } from "react";
import UseAxios from "../hooks/UseAxios";
import { Link } from 'react-router-dom';

const FilterMarket = () => {
  const { response } = UseAxios('coins/markets?vs_currency=usd');

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [volume, setVolume] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(1000);
  const [filteredCoins, setFilteredCoins] = useState([]);

  // Function to filter coins based on user input
  const filterCoins = () => {
    const filtered = response ? response.filter(coin => {
      const inPriceRange = priceRange.min && priceRange.max
        ? coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
        : true;

      const meetsVolume = volume ? coin.total_volume >= volume : true;
      const meetsMarketCap = marketCap ? coin.market_cap >= marketCap : true;

      return inPriceRange && meetsVolume && meetsMarketCap;
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

      {/* Volume Input */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label className="text-lg sm:text-xl text-gray-300 mb-2 sm:mb-0">Volume (24h):</label>
        <input
          className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white rounded sm:mx-4 sm:px-4 py-2"
          type="number"
          value={volume}
          placeholder="Volume"
          onChange={(e) => setVolume(e.target.value)}
        />
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








// import React, { useState } from "react";
// import UseAxios from "../hooks/UseAxios";
// import Coin from "./Coin";

// const FilterMarket = () => {
//   const { response } = UseAxios('coins/markets?vs_currency=usd');

//   // State for filtering input values
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [volume, setVolume] = useState('');
//   const [marketCap, setMarketCap] = useState('');
//   const [transactionAmount, setTransactionAmount] = useState(100); // default $100
//   const [filteredCoins, setFilteredCoins] = useState([]); // State to store filtered coins
//   const [suggestedParams, setSuggestedParams] = useState(null); // To store suggestions

//   // Simulated price data across multiple exchanges
//   const getExchangePrices = (coinId) => {
//     const prices = {
//       binance: Math.random() * 1,  // Simulated price from Binance
//       coinbase: Math.random() * 1, // Simulated price from Coinbase
//       kraken: Math.random() * 1,   // Simulated price from Kraken
//     };
//     return prices;
//   };

//   // Calculate profit and risk based on exchange prices
//   const calculateRiskAndProfit = (prices) => {
//     const priceValues = Object.values(prices);
//     const minPrice = Math.min(...priceValues); // Lowest price (buy price)
//     const maxPrice = Math.max(...priceValues); // Highest price (sell price)
    
//     const profit = (transactionAmount / minPrice) * (maxPrice - minPrice); // Arbitrage profit
//     const risk = ((maxPrice - minPrice) / minPrice) * 100; // Risk percentage based on price volatility

//     return { profit, risk, minPrice, maxPrice };
//   };

//   // Filter coins based on input values and check transaction amount
//   const filterCoins = () => {
//     const filtered = response ? response.filter(coin => {
//       const inPriceRange = priceRange.min && priceRange.max
//         ? coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
//         : true;

//       const meetsVolume = volume ? coin.total_volume >= volume : true;
//       const meetsMarketCap = marketCap ? coin.market_cap >= marketCap : true;

//       return inPriceRange && meetsVolume && meetsMarketCap;
//     }) : [];

//     // Check if the transaction amount is enough to buy coins
//     const validCoins = filtered.filter(coin => transactionAmount >= coin.current_price);
    
//     if (validCoins.length > 0) {
//       setFilteredCoins(validCoins);
//       setSuggestedParams(null); // Clear any suggestions if coins are found
//     } else {
//       setFilteredCoins([]); // No valid coins match the criteria

//       // If no valid coins, suggest new price range, volume, market cap, and transaction amount
//       const suggestedCoin = filtered[0]; // Take the first coin in the filtered list to suggest
//       if (suggestedCoin) {
//         const exchangePrices = getExchangePrices(suggestedCoin.id);
//         const { profit, risk, minPrice, maxPrice } = calculateRiskAndProfit(exchangePrices);

//         // Suggest a transaction amount that allows for a $1-$2 profit range
//         const suggestedTransactionAmount = Math.ceil(minPrice * (transactionAmount / maxPrice));

//         setSuggestedParams({
//           suggestedTransactionAmount: suggestedTransactionAmount,
//           suggestedPriceRange: { min: suggestedCoin.current_price, max: suggestedCoin.current_price + 100 },
//           suggestedVolume: suggestedCoin.total_volume,
//           suggestedMarketCap: suggestedCoin.market_cap,
//           suggestedExchanges: ['Binance', 'Coinbase', 'Kraken'], // Top 3 exchanges by profit
//         });
//       }
//     }
//   };

//   return (
//     <section className="mt-[10%]">
//       <h1 className="text-5xl mb-12 text-gray-300">Filter Your Desired <span className="text-yellow-600">Cryptocurrencies</span></h1>
      
//       {/* Filter Inputs */}
//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Price Range ($):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5"
//           type="number" 
//           placeholder="Min" 
//           value={priceRange.min} 
//           onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} 
//         />
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5"
//           type="number" 
//           placeholder="Max" 
//           value={priceRange.max} 
//           onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Volume (24h):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5" 
//           type="number" 
//           value={volume} 
//           placeholder="Volume" 
//           onChange={(e) => setVolume(e.target.value)} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Market Cap:</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5" 
//           type="number" 
//           value={marketCap} 
//           placeholder="Market Cap" 
//           onChange={(e) => setMarketCap(e.target.value)} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Transaction Amount ($):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10"
//           type="number" 
//           value={transactionAmount} 
//           placeholder="$500" 
//           onChange={(e) => setTransactionAmount(e.target.value)} 
//         />
//       </div>

//       {/* Button to trigger filtering */}
//       <button 
//         onClick={filterCoins} 
//         className="bg-yellow-700 text-white px-6 py-2 rounded-lg mb-6
//                     hover:bg-yellow-900 hover:text-white"
//       >
//         Generate Data
//       </button>

//       {/* Render the filtered coins */}
//       {filteredCoins.length > 0 ? (
//         filteredCoins.map(coin => {
//           // Get simulated exchange prices
//           const exchangePrices = getExchangePrices(coin.id);
          
//           // Calculate profit and risk
//           const { profit, risk, minPrice, maxPrice } = calculateRiskAndProfit(exchangePrices);

//           return (
//             <div key={coin.id} className="mb-7 space-x-4 bg-slate-900">
//               {/* Coin Component */}
//               <Coin coin={coin} />
              
//               {/* Row layout for Profit, Risk, and Prices */}
//               <div className="flex flex-wrap bg-yellow-800 hover:bg-gray-900 hover:text-gray-400 mt-2 rounded-lg px-6">
//                 {/* Potential Profit and Risk */}
//                 <div className="text-lg">
//                   <p>Potential Profit: ${profit.toFixed(2)}</p>
//                 </div>
//                 <div className="text-lg mr-6">
//                   <p>Risk: {risk.toFixed(2)}%</p>
//                 </div>

//                 {/* Prices from exchanges */}
//                 <div className="flex flex-wrap text-lg">
//                   <p>Prices from exchanges:</p>
//                   <ul className="flex flex-wrap gap-6">
//                     <li>Binance: ${exchangePrices.binance.toFixed(2)}</li>
//                     <li>Coinbase: ${exchangePrices.coinbase.toFixed(2)}</li>
//                     <li>Kraken: ${exchangePrices.kraken.toFixed(2)}</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p className="text-3xl text-yellow-600 mb-12">No coins match the filter criteria for $1 to $2 profit.</p>
//       )}

//       {/* Suggest new parameters if no coins match */}
//       {suggestedParams && (
//         <div className="mt-6 p-4 bg-slate-800 text-gray-300 rounded-lg">
//           <h2 className="text-2xl mb-4">Suggested Parameters:</h2>
//           <p>Suggested Transaction Amount: ${suggestedParams.suggestedTransactionAmount}</p>
//           <p>Suggested Price Range: ${suggestedParams.suggestedPriceRange.min} - ${suggestedParams.suggestedPriceRange.max}</p>
//           <p>Suggested Volume: {suggestedParams.suggestedVolume}</p>
//           <p>Suggested Market Cap: {suggestedParams.suggestedMarketCap}</p>
//           <p>Top 3 Exchanges: {suggestedParams.suggestedExchanges.join(', ')}</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default FilterMarket;






// import React, { useState } from "react";
// import UseAxios from "../hooks/UseAxios";
// import Coin from "./Coin";

// const FilterMarket = () => {
//   const { response } = UseAxios('coins/markets?vs_currency=usd');

//   // State for filtering input values
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [volume, setVolume] = useState('');
//   const [marketCap, setMarketCap] = useState('');
//   const [transactionAmount, setTransactionAmount] = useState(1000); // default $1000
//   const [filteredCoins, setFilteredCoins] = useState([]); // State to store filtered coins

//   // Simulated price data across multiple exchanges
//   const getExchangePrices = (coinId) => {
//     const prices = {
//       binance: (Math.random() * 100) + 1,  // Simulated price from Binance
//       coinbase: (Math.random() * 100) + 1, // Simulated price from Coinbase
//       kraken: (Math.random() * 100) + 1,   // Simulated price from Kraken
//     };
//     return prices;
//   };

//   // Calculate profit and risk based on exchange prices
//   const calculateProfit = (prices, transactionAmount) => {
//     const priceValues = Object.values(prices);
//     const minPrice = Math.min(...priceValues); // Lowest price (buy price)
//     const maxPrice = Math.max(...priceValues); // Highest price (sell price)
    
//     // Potential profit for the given transaction amount
//     const profit = (transactionAmount / minPrice) * (maxPrice - minPrice); 

//     return profit; // Return just the profit
//   };

//   // Filter coins based on input values and profit thresholds ($1 to $2 profit)
//   const filterCoins = () => {
//     const filtered = response ? response.filter(coin => {
//       const inPriceRange = priceRange.min && priceRange.max
//         ? coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
//         : true;

//       const meetsVolume = volume ? coin.total_volume >= volume : true;
//       const meetsMarketCap = marketCap ? coin.market_cap >= marketCap : true;

//       return inPriceRange && meetsVolume && meetsMarketCap;
//     }).filter(coin => {
//       // Get simulated exchange prices
//       const exchangePrices = getExchangePrices(coin.id);

//       // Calculate profit based on transaction amount
//       const profit = calculateProfit(exchangePrices, transactionAmount);

//       // Return true if the profit is between $1 and $2
//       return profit >= 1 && profit <= 2;
//     }) : [];

//     setFilteredCoins(filtered); // Set filtered coins to state
//   };

//   return (
//     <section className="mt-[10%]">
//       <h1 className="text-5xl mb-12 text-gray-300">Filter Your Desired <span className="text-yellow-600">Cryptocurrencies</span></h1>
      
//       {/* Filter Inputs */}
//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Price Range ($):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5"
//           type="number" 
//           placeholder="Min" 
//           value={priceRange.min} 
//           onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} 
//         />
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5"
//           type="number" 
//           placeholder="Max" 
//           value={priceRange.max} 
//           onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Volume (24h):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5" 
//           type="number" 
//           value={volume} 
//           placeholder="Volume" 
//           onChange={(e) => setVolume(e.target.value)} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Market Cap:</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5" 
//           type="number" 
//           value={marketCap} 
//           placeholder="Market Cap" 
//           onChange={(e) => setMarketCap(e.target.value)} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Transaction Amount ($):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10"
//           type="number" 
//           value={transactionAmount} 
//           placeholder="$500" 
//           onChange={(e) => setTransactionAmount(e.target.value)} 
//         />
//       </div>

//       {/* Button to trigger filtering */}
//       <button 
//         onClick={filterCoins} 
//         className="bg-yellow-700 text-white px-6 py-2 rounded-lg mb-6
//                     hover:bg-yellow-900 hover:text-white"
//       >
//         Generate Data
//       </button>

//       {/* Render the filtered coins */}
//       {filteredCoins.length > 0 ? (
//         filteredCoins.map(coin => {
//           // Get simulated exchange prices
//           const exchangePrices = getExchangePrices(coin.id);
          
//           // Calculate profit based on transaction amount
//           const profit = calculateProfit(exchangePrices, transactionAmount);

//           return (
//             <div key={coin.id} className="mb-7 space-x-4 bg-slate-900">
//               {/* Coin Component */}
//               <Coin coin={coin} />
              
//               {/* Row layout for Profit and Prices */}
//               <div className="flex flex-wrap bg-yellow-800 hover:bg-gray-900 hover:text-gray-400 mt-2 rounded-lg px-6">
//                 {/* Potential Profit */}
//                 <div className="text-lg">
//                   <p>Potential Profit: ${profit.toFixed(2)}</p>
//                 </div>

//                 {/* Prices from exchanges */}
//                 <div className="flex flex-wrap text-lg">
//                   <p>Prices from exchanges:</p>
//                   <ul className="flex flex-wrap gap-6">
//                     <li>Binance: ${exchangePrices.binance.toFixed(2)}</li>
//                     <li>Coinbase: ${exchangePrices.coinbase.toFixed(2)}</li>
//                     <li>Kraken: ${exchangePrices.kraken.toFixed(2)}</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p className="text-3xl text-yellow-600 mb-12">No coins match the filter criteria for $1 to $2 profit.</p>
//       )}
//     </section>
//   );
// };

// export default FilterMarket;







// import React, { useState } from "react";
// import UseAxios from "../hooks/UseAxios";
// import Coin from "./Coin";

// const FilterMarket = () => {
//   const { response } = UseAxios('coins/markets?vs_currency=usd');

//   // State for filtering input values
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [volume, setVolume] = useState('');
//   const [marketCap, setMarketCap] = useState('');
//   const [transactionAmount, setTransactionAmount] = useState(1000); // default $1000
//   const [filteredCoins, setFilteredCoins] = useState([]); // State to store filtered coins

//   // Simulated price data across multiple exchanges
//   const getExchangePrices = (coinId) => {
//     const prices = {
//       binance: Math.random() * 1,  // Simulated price from Binance
//       coinbase: Math.random() * 1, // Simulated price from Coinbase
//       kraken: Math.random() * 1,   // Simulated price from Kraken
//     };
//     return prices;
//   };

//   // Calculate profit and risk based on exchange prices
//   const calculateRiskAndProfit = (prices) => {
//     const priceValues = Object.values(prices);
//     const minPrice = Math.min(...priceValues); // Lowest price (buy price)
//     const maxPrice = Math.max(...priceValues); // Highest price (sell price)
    
//     const profit = (transactionAmount / minPrice) * (maxPrice - minPrice); // Arbitrage profit for $1000
//     const risk = ((maxPrice - minPrice) / minPrice) * 100; // Risk percentage based on price volatility

//     return { profit, risk, minPrice, maxPrice };
//   };

//   // Filter coins based on input values
//   const filterCoins = () => {
//     const filtered = response ? response.filter(coin => {
//       const inPriceRange = priceRange.min && priceRange.max
//         ? coin.current_price >= priceRange.min && coin.current_price <= priceRange.max
//         : true;

//       const meetsVolume = volume ? coin.total_volume >= volume : true;
//       const meetsMarketCap = marketCap ? coin.market_cap >= marketCap : true;

//       return inPriceRange && meetsVolume && meetsMarketCap;
//     }) : [];

//     setFilteredCoins(filtered); // Set filtered coins to state
//   };

//   return (
//     <section className="mt-[10%]">
//       <h1 className="text-5xl mb-12 text-gray-300">Filter Your Desired <span className="text-yellow-600">Cryptocurrencies</span></h1>
      
//       {/* Filter Inputs */}
//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Price Range ($):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5"
//           type="number" 
//           placeholder="Min" 
//           value={priceRange.min} 
//           onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} 
//         />
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5"
//           type="number" 
//           placeholder="Max" 
//           value={priceRange.max} 
//           onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Volume (24h):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5" 
//           type="number" 
//           value={volume} 
//           placeholder="Volume" 
//           onChange={(e) => setVolume(e.target.value)} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Market Cap:</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10 pl-5" 
//           type="number" 
//           value={marketCap} 
//           placeholder="Market Cap" 
//           onChange={(e) => setMarketCap(e.target.value)} 
//         />
//       </div>

//       <div className="mb-6">
//         <label className="text-xl text-gray-300">Transaction Amount ($):</label>
//         <input
//           className="text-lg font-medium text-slate-700 hover:bg-slate-500 hover:text-white
//                       rounded mx-10"
//           type="number" 
//           value={transactionAmount} 
//           placeholder="$500" 
//           onChange={(e) => setTransactionAmount(e.target.value)} 
//         />
//       </div>

//       {/* Button to trigger filtering */}
//       <button 
//         onClick={filterCoins} 
//         className="bg-yellow-700 text-white px-6 py-2 rounded-lg mb-6
//                     hover:bg-yellow-900 hover:text-white"
//       >
//         Generate Data
//       </button>

//       {/* Render the filtered coins */}
//       {filteredCoins.length > 0 ? (
//         filteredCoins.map(coin => {
//           // Get simulated exchange prices
//           const exchangePrices = getExchangePrices(coin.id);
          
//           // Calculate profit and risk
//           const { profit, risk, minPrice, maxPrice } = calculateRiskAndProfit(exchangePrices);

//           return (
//             <div key={coin.id} className="mb-7 space-x-4 bg-slate-900">
//               {/* Coin Component */}
//               <Coin coin={coin} />
              
//               {/* Row layout for Profit, Risk, and Prices */}
//               <div className="flex flex-wrap bg-yellow-800 hover:bg-gray-900 hover:text-gray-400 mt-2 rounded-lg px-6">
//                 {/* Potential Profit and Risk */}
//                 <div className="text-lg">
//                   <p>Potential Profit: ${profit.toFixed(2)}</p>
//                 </div>
//                 <div className="text-lg mr-6">
//                   <p>Risk: {risk.toFixed(2)}%</p>
//                 </div>

//                 {/* Prices from exchanges */}
//                 <div className="flex flex-wrap text-lg">
//                   <p>Prices from exchanges:</p>
//                   <ul className="flex flex-wrap gap-6">
//                     <li>Binance: ${exchangePrices.binance.toFixed(2)}</li>
//                     <li>Coinbase: ${exchangePrices.coinbase.toFixed(2)}</li>
//                     <li>Kraken: ${exchangePrices.kraken.toFixed(2)}</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p className="text-3xl text-yellow-600 mb-12">No coins match the filter criteria.</p>
//       )}
//     </section>
//   );
// };

// export default FilterMarket;







// import UseAxios from "../hooks/UseAxios";
// import Coin from "./Coin";

// const FilterMarket = () => {
//   const { response } = UseAxios('coins/markets?vs_currency=usd');

//   // Simulating price data across multiple exchanges for each coin (for demonstration purposes)
//   const getExchangePrices = (coinId) => {
//     const prices = {
//       binance: Math.random() * 1,  // Simulated price from Binance
//       coinbase: Math.random() * 1, // Simulated price from Coinbase
//       kraken: Math.random() * 1,   // Simulated price from Kraken
//     };
//     return prices;
//   };

//   // Function to calculate profit and risk
//   const calculateRiskAndProfit = (prices) => {
//     const priceValues = Object.values(prices);
//     const minPrice = Math.min(...priceValues); // Lowest price (buy price)
//     const maxPrice = Math.max(...priceValues); // Highest price (sell price)

//     const profit = maxPrice - minPrice; // Potential profit
//     const risk = (maxPrice - minPrice) / minPrice * 100; // Risk percentage based on price volatility

//     return { profit, risk };
//   };

//   // Filter coins priced at $1 or less
//   const filteredCoins = response ? response.filter(coin => coin.current_price <= 1) : [];

//   return (
//     <section className="mt-[10%]">
//       <h1 className="text-2xl mb-12 text-gray-300">Cryptocurrencies Under <span className="text-yellow-500">$1</span></h1>
//       {/* Render the filtered coins */}
//       {filteredCoins.length > 0 ? (
//         filteredCoins.map(coin => {
//           // Get simulated exchange prices
//           const exchangePrices = getExchangePrices(coin.id);
          
//           // Calculate profit and risk
//           const { profit, risk } = calculateRiskAndProfit(exchangePrices);

//           return (
//             <div key={coin.id} className="mb-7 space-x-4 bg-slate-900">
//               {/* Coin Component */}
//               <Coin coin={coin} />
              
//               {/* Row layout for Profit, Risk, and Prices */}
//               <div className="flex flex-wrap bg-yellow-800 hover:bg-gray-900 hover:text-gray-400 mt-2 rounded-lg px-6">
//                 {/* Potential Profit and Risk */}
//                 <div className="text-lg">
//                   <p>Potential Profit: ${profit.toFixed(2)}</p>
//                 </div>
//                 <div className="text-lg mr-6">
//                   <p>Risk: {risk.toFixed(2)}%</p>
//                 </div>

//                 {/* Prices from exchanges */}
//                 <div className="flex flex-wrap text-lg">
//                   <p>Prices from exchanges:</p>
//                   <ul className="flex flex-wrap gap-6">
//                     <li>Binance: ${exchangePrices.binance.toFixed(2)}</li>
//                     <li>Coinbase: ${exchangePrices.coinbase.toFixed(2)}</li>
//                     <li>Kraken: ${exchangePrices.kraken.toFixed(2)}</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>No coins under $1 found.</p>
//       )}
//     </section>
//   );
// };

// export default FilterMarket;