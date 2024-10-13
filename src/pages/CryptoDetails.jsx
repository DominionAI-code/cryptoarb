import { useParams } from 'react-router-dom';
import useAxios from '../hooks/UseAxios';
import { useState } from 'react';

const CryptoDetails = () => {
  const { id } = useParams(); 
  const { response } = useAxios(`https://api.coingecko.com/api/v3/coins/${id}`);
  const [transactionAmount, setTransactionAmount] = useState(100); // Default transaction amount

  if (!response) {
    return <div>Loading...</div>;
  }

  // Function to map trust score to color
  const getTrustScoreColor = (score) => {
    switch (score) {
      case 'green':
        return 'bg-green-500'; // Tailwind class for green background
      case 'yellow':
        return 'bg-yellow-500'; // Tailwind class for yellow background
      case 'red':
        return 'bg-red-500'; // Tailwind class for red background
      default:
        return 'bg-gray-500'; // Default to gray if no score available
    }
  };

  // Function to calculate potential profit percentage
  const calculateProfitPercentage = (lowPrice, highPrice) => {
    return ((highPrice - lowPrice) / lowPrice) * 100;
  };

  // Extract prices from the tickers data, filter out null values
  const tickersWithPrice = response.tickers.filter(ticker => ticker.converted_last.usd !== null);

  // Sort tickers by price to find the best 3 exchanges for buying (lowest price) and selling (highest price)
  const sortedByPrice = [...tickersWithPrice].sort((a, b) => a.converted_last.usd - b.converted_last.usd);

  // Get top 3 exchanges for buying (lowest price)
  const bestBuyExchanges = sortedByPrice.slice(0, 3);

  // Get top 3 exchanges for selling (highest price)
  const bestSellExchanges = sortedByPrice.slice(-3).reverse();

  // Calculate lowest and highest price
  const lowestPrice = bestBuyExchanges[0]?.converted_last.usd || 0;
  const highestPrice = bestSellExchanges[0]?.converted_last.usd || 0;

  // Calculate profit and risk
  const potentialProfit = calculateProfitPercentage(lowestPrice, highestPrice);
  const profitAmount = (transactionAmount / lowestPrice) * (highestPrice - lowestPrice);
  const risk = ((highestPrice - lowestPrice) / lowestPrice) * 100;

  return (
    <div className='my-6 mt-[8%]'>
      <div className='flex gap-2 items-center'>
        {/* Display crypto image */}
        {response.image && (
          <img src={response.image.small} alt={response.name} />
        )}
        <h1 className='text-2xl mb-2 capitalize font-bold'>
          {response.name}
        </h1>
      </div>

      {/* Transaction Amount Input */}
      <div className='my-4'>
        <label htmlFor='transactionAmount' className='block mb-2'>Transaction Amount (USD):</label>
        <input
          type='number'
          id='transactionAmount'
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className='border px-4 py-2'
        />
      </div>

      {/* Arbitrage Opportunities Section */}
      <div className='mt-6'>
        <h2 className='text-xl font-semibold'>Arbitrage Opportunities</h2>
        <p>Potential Profit: {potentialProfit.toFixed(2)}%</p>
        <p>Profit Amount: ${profitAmount.toFixed(2)} (on {transactionAmount} USD transaction)</p>
        <p>Risk (Price Volatility): {risk.toFixed(2)}%</p>

        {/* Buy Suggestions */}
        <h3 className='mt-4 text-lg font-semibold'>Best Exchanges to Buy (Low Price):</h3>
        <ul>
          {bestBuyExchanges.map((exchange, index) => (
            <li key={index}>
              Buy on {exchange.market.name} at ${exchange.converted_last.usd.toFixed(2)} (Trust Score: <span className={getTrustScoreColor(exchange.trust_score)}>{exchange.trust_score}</span>)
            </li>
          ))}
        </ul>

        {/* Sell Suggestions */}
        <h3 className='mt-4 text-lg font-semibold'>Best Exchanges to Sell (High Price):</h3>
        <ul>
          {bestSellExchanges.map((exchange, index) => (
            <li key={index}>
              Sell on {exchange.market.name} at ${exchange.converted_last.usd.toFixed(2)} (Trust Score: <span className={getTrustScoreColor(exchange.trust_score)}>{exchange.trust_score}</span>)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CryptoDetails;






// import { useParams } from 'react-router-dom';
// import useAxios from '../hooks/UseAxios';
// import { useState } from 'react';

// const CryptoDetails = () => {
//   const { id } = useParams(); 
//   const { response } = useAxios(`https://api.coingecko.com/api/v3/coins/${id}`);
//   const [transactionAmount, setTransactionAmount] = useState(100); // Default transaction amount

//   if (!response) {
//     return <div>Loading...</div>;
//   }

//   // Function to map trust score to color
//   const getTrustScoreColor = (score) => {
//     switch (score) {
//       case 'green':
//         return 'bg-green-500'; // Tailwind class for green background
//       case 'yellow':
//         return 'bg-yellow-500'; // Tailwind class for yellow background
//       case 'red':
//         return 'bg-red-500'; // Tailwind class for red background
//       default:
//         return 'bg-gray-500'; // Default to gray if no score available
//     }
//   };

//   // Function to calculate potential profit percentage
//   const calculateProfitPercentage = (lowPrice, highPrice) => {
//     return ((highPrice - lowPrice) / lowPrice) * 100;
//   };

//   // Calculate the lowest and highest prices from the tickers data
//   const prices = response.tickers.map(ticker => ticker.converted_last.usd).filter(price => price); // Filter out null values
//   const lowestPrice = Math.min(...prices);
//   const highestPrice = Math.max(...prices);

//   // Calculate profit and risk
//   const potentialProfit = calculateProfitPercentage(lowestPrice, highestPrice);
//   const profitAmount = (transactionAmount / lowestPrice) * (highestPrice - lowestPrice);
  
//   // Risk is assumed to be the volatility, which can be approximated by the difference between the highest and lowest prices
//   const risk = ((highestPrice - lowestPrice) / lowestPrice) * 100;

//   // Find the best exchange to buy and sell
//   const bestBuyExchange = response.tickers.find(ticker => ticker.converted_last.usd === lowestPrice);
//   const bestSellExchange = response.tickers.find(ticker => ticker.converted_last.usd === highestPrice);

//   return (
//     <div className='my-6 mt-[8%]'>
//       <div className='flex gap-2 items-center'>
//         {/* Display crypto image */}
//         {response.image && (
//           <img src={response.image.small} alt={response.name} />
//         )}
//         <h1 className='text-2xl mb-2 capitalize font-bold'>
//           {response.name}
//         </h1>
//       </div>

//       {/* Transaction Amount Input */}
//       <div className='my-4'>
//         <label htmlFor='transactionAmount' className='block mb-2'>Transaction Amount (USD):</label>
//         <input
//           type='number'
//           id='transactionAmount'
//           value={transactionAmount}
//           onChange={(e) => setTransactionAmount(e.target.value)}
//           className='border px-4 py-2'
//         />
//       </div>

//       <div className='mt-4'>
//         <h2 className='text-xl font-semibold'>Market Data</h2>
//         <table className='min-w-full table-auto'>
//           <thead>
//             <tr>
//               <th className='px-4 py-2'>Exchange</th>
//               <th className='px-4 py-2'>Price</th>
//               <th className='px-4 py-2'>Volume</th>
//               <th className='px-4 py-2'>Volume (%)</th>
//               <th className='px-4 py-2'>Trust Score</th>
//               <th className='px-4 py-2'>Last Updated</th>
//             </tr>
//           </thead>
//           <tbody>
//             {response.tickers && response.tickers.map((ticker, index) => (
//               <tr key={index} className='hover:bg-gray-200'>
//                 <td className='border px-4 py-2'>{ticker.market.name}</td>
//                 <td className='border px-4 py-2'>
//                   ${ticker.converted_last.usd ? ticker.converted_last.usd.toFixed(2) : 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2'>
//                   {ticker.converted_volume.usd ? ticker.converted_volume.usd.toFixed(2) : 'N/A'} USD
//                 </td>
//                 <td className='border px-4 py-2'>
//                   {ticker.volume ? `${ticker.volume.toFixed(2)}%` : 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2'>
//                   <span className={`inline-block w-4 h-4 rounded-full ${getTrustScoreColor(ticker.trust_score)}`}>
//                   </span>
//                 </td>
//                 <td className='border px-4 py-2'>
//                   {ticker.last_traded_at ? new Date(ticker.last_traded_at).toLocaleString() : 'N/A'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Buy/Sell Suggestions */}
//       <div className='mt-6'>
//         <h2 className='text-xl font-semibold'>Arbitrage Opportunities</h2>
//         <p>Best Exchange to Buy: {bestBuyExchange ? bestBuyExchange.market.name : 'N/A'} at ${lowestPrice.toFixed(2)}</p>
//         <p>Best Exchange to Sell: {bestSellExchange ? bestSellExchange.market.name : 'N/A'} at ${highestPrice.toFixed(2)}</p>
//         <p>Potential Profit: {potentialProfit.toFixed(2)}%</p>
//         <p>Profit Amount: ${profitAmount.toFixed(2)} (on {transactionAmount} USD transaction)</p>
//         <p>Risk (Price Volatility): {risk.toFixed(2)}%</p>
//       </div>
//     </div>
//   );
// };

// export default CryptoDetails;





// import { useParams } from 'react-router-dom';
// import useAxios from '../hooks/UseAxios';

// const CryptoDetails = () => {
//   const { id } = useParams(); 
//   const { response } = useAxios(`https://api.coingecko.com/api/v3/coins/${id}`);

//   if (!response) {
//     return <div>Loading...</div>;
//   }

//   // Function to map trust score to color
//   const getTrustScoreColor = (score) => {
//     switch (score) {
//       case 'green':
//         return 'bg-green-500'; // Tailwind class for green background
//       case 'yellow':
//         return 'bg-yellow-500'; // Tailwind class for yellow background
//       case 'red':
//         return 'bg-red-500'; // Tailwind class for red background
//       default:
//         return 'bg-gray-500'; // Default to gray if no score available
//     }
//   };

//   return (
//     <div className='my-6 mt-[8%]'>
//       <div className='flex gap-2 items-center'>
//         {/* Display crypto image */}
//         {response.image && (
//           <img src={response.image.small} alt={response.name} />
//         )}
//         <h1 className='text-2xl mb-2 capitalize font-bold'>
//           {response.name}
//         </h1>
//       </div>

//       <div className='mt-4'>
//         <h2 className='text-xl font-semibold'>Market Data</h2>
//         <table className='min-w-full table-auto'>
//           <thead>
//             <tr>
//               <th className='px-4 py-2'>Exchange</th>
//               <th className='px-4 py-2'>Price</th>
//               <th className='px-4 py-2'>Volume</th>
//               <th className='px-4 py-2'>Volume (%)</th>
//               <th className='px-4 py-2'>Trust Score</th>
//               <th className='px-4 py-2'>Last Updated</th>
//             </tr>
//           </thead>
//           <tbody>
//             {response.tickers && response.tickers.map((ticker, index) => (
//               <tr key={index} className='hover:bg-gray-200'>
//                 <td className='border px-4 py-2'>{ticker.market.name}</td>
//                 <td className='border px-4 py-2'>
//                   ${ticker.converted_last.usd ? ticker.converted_last.usd.toFixed(2) : 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2'>
//                   {ticker.converted_volume.usd ? ticker.converted_volume.usd.toFixed(2) : 'N/A'} USD
//                 </td>
//                 <td className='border px-4 py-2'>
//                   {ticker.volume ? `${ticker.volume.toFixed(2)}%` : 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2'>
//                   <span className={`inline-block w-4 h-4 rounded-full ${getTrustScoreColor(ticker.trust_score)}`}>
//                   </span>
//                 </td>
//                 <td className='border px-4 py-2'>
//                   {ticker.last_traded_at ? new Date(ticker.last_traded_at).toLocaleString() : 'N/A'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CryptoDetails;
