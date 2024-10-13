import { Link } from "react-router-dom";
import { DownTrending, UpTrending } from "../icons/icons";
import { currencyFormat } from "../utils";

const Coin = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 font-semibold p-2
      border-gray-300 border-b bg-gray-800 text-base sm:text-lg md:text-xl text-gray-400 rounded-lg transition-colors duration-300 
      hover:bg-yellow-800 hover:text-black cursor-pointer">
        
        {/* Coin Name and Symbol Section */}
        <div className="flex items-center gap-2 w-full">
          <img className="w-6 sm:w-8" src={coin.image} alt={coin.name} />
          <p className="truncate">{coin.name}</p> {/* truncate for long names */}
          <span className="text-xs sm:text-sm">({coin.symbol.toUpperCase()})</span>
        </div>
        
        {/* Current Price */}
        <span className="w-full text-right sm:text-center">{currencyFormat(coin.current_price)}</span>
        
        {/* Price Change Section */}
        <span className={`flex items-center gap-1 justify-end sm:justify-center ${coin.price_change_percentage_24h < 0 ? 'text-red-400' : 
          'text-green-400'}`}>
          {coin.price_change_percentage_24h < 0 ? <DownTrending /> : <UpTrending />}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>

        {/* Market Cap (Visible on larger screens only) */}
        <div className="hidden md:block text-right sm:text-center">
          <p className="font-semibold">Market Cap</p>
          <span>{currencyFormat(coin.market_cap)}</span>
        </div>
      </div>
    </Link>
  );
};

export default Coin;



// import { Link } from "react-router-dom"
// import { DownTrending, UpTrending } from "../icons/icons"
// import { currencyFormat } from "../utils"

// const Coin = ({ coin }) => {
//   return (
//     <Link to={`/coin/${coin.id}`}>
//       <div className="grid grid-cols-3 md:grid-cols-4 font-semibold p-2
//       border-gray-300 border-b bg-gray-800 text-xl text-gray-400 rounded-lg transition-colors duration-300 
//       hover:bg-yellow-800 hover:text-black cursor-pointer">
//         <div className="flex items-center gap-2 w-full mt-50">
//           <img className="w-6" src={coin.image} alt={coin.name} />
//           <p>{coin.name}</p>
//           <span className="text-xs">({coin.symbol})</span>
//         </div>
//         <span className="w-full text-center">{currencyFormat(coin.current_price)}</span>
//         <span className={`flex gap-1 ${coin.price_change_percentage_24h < 0 ? 'text-red-400' : 
//           'text-green-400'}`}>
//           {coin.price_change_percentage_24h < 0 ? < DownTrending /> : <UpTrending />}
//           {coin.price_change_percentage_24h}
//         </span>
//         <div className="hidden sm:block">
//           <p className="font-semibold">Market Cap</p>
//           <span>{currencyFormat(coin.market_cap)}</span>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Coin