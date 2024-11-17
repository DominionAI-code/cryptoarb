import { Link } from "react-router-dom";

const CoinTrending = ({ coin }) => {
  console.log(coin);

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="font-light p-1 hover:bg-gray-300 hover:rounded transition duration-300">
        <div className="flex items-center gap-3">
          {/* Rank */}
          <span className="font-semibold text-sm sm:text-base md:text-lg">{coin.score + 1}</span>
          
          {/* Coin Image */}
          <img
            className="w-6 sm:w-8 md:w-10"
            src={coin.small}
            alt={coin.name}
          />
          
          {/* Coin Name */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <p className="text-sm sm:text-base md:text-lg">{coin.name}</p>
            <small className="text-xs sm:text-sm md:text-base text-gray-500 ml-2">({coin.symbol.toUpperCase()})</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinTrending;