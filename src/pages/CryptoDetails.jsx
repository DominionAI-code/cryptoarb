import { useParams } from 'react-router-dom';
import useAxios from '../hooks/UseAxios';
import { useState } from 'react';

const CryptoDetails = () => {
  const { id } = useParams(); 
  const { response } = useAxios(`https://api.coingecko.com/api/v3/coins/${id}`);
  const [transactionAmount, setTransactionAmount] = useState(1000); // Default transaction amount

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

  // Filter tickers with green trust score and a valid price
  const greenTrustTickers = response.tickers.filter(
    ticker => ticker.trust_score === 'green' && ticker.converted_last.usd !== null
  );

  // Sort tickers by price to find the best 3 exchanges for buying (lowest price) and selling (highest price)
  const sortedByPrice = [...greenTrustTickers].sort((a, b) => a.converted_last.usd - b.converted_last.usd);

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
        <p>Potential Profit: {potentialProfit}%</p>
        <p>Profit Amount: ${profitAmount.toFixed(2)} (on {transactionAmount} USD transaction)</p>
        <p>Risk (Price Volatility): {risk}%</p>

        {/* Buy Suggestions */}
        <h3 className='mt-4 text-lg font-semibold'>Best Exchanges to Buy (Low Price):</h3>
        <ul>
          {bestBuyExchanges.map((exchange, index) => (
            <li key={index}>
              Buy on {exchange.market.name} at ${exchange.converted_last.usd} (Trust Score: <span className={getTrustScoreColor(exchange.trust_score)}>{exchange.trust_score}</span>)
            </li>
          ))}
        </ul>

        {/* Sell Suggestions */}
        <h3 className='mt-4 text-lg font-semibold'>Best Exchanges to Sell (High Price):</h3>
        <ul>
          {bestSellExchanges.map((exchange, index) => (
            <li key={index}>
              Sell on {exchange.market.name} at ${exchange.converted_last.usd} (Trust Score: <span className={getTrustScoreColor(exchange.trust_score)}>{exchange.trust_score}</span>)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CryptoDetails;