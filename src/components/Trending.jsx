import UseAxios from "../hooks/UseAxios";
import CoinTrending from "./CoinTrending";
import BitCoin1 from '../image/BitCoin1.jpg';

const Trending = () => {
  const { response } = UseAxios('search/trending');
  console.log(response);

  return (
    <div className="relative mt-8 flex flex-col lg:flex-row bg-gradient-to-r from-gray-100 to-gray-300 p-4 rounded-lg shadow-lg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center rounded-lg" 
        style={{ backgroundImage: `url(${BitCoin1})` }}
      ></div>
      
      {/* Black Overlay with Opacity */}
      <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row">
        {/* Welcome Text */}
        <div className="absolute left-6 top-0 text-gray-400 text-5xl lg:text-8xl font-bold ml-4 md:ml-10 animate-fade-in flex items-center h-full">
          <h1>
            <span className="text-yellow-500">C</span>rypto
            <span className="text-yellow-500">U</span>pdates
          </h1>
        </div>

        <div className="w-full flex flex-col lg:flex-row mt-8">
          {/* Space between the image and the trending section */}
          <div className="w-full lg:w-2/3 h-auto relative z-10 mt-4 lg:mt-0">
            {/* You could keep the image here if needed */}
          </div>

          {/* Trending Section */}
          <div className="w-full lg:w-1/3 lg:ml-8 relative z-10 mt-8 lg:mt-0">
            <h1 className="text-2xl mb-4 text-yellow-600">Trending</h1>
            <div className="bg-transparent text-yellow-600 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl p-4">
              {response && response.coins.map(coin => (
                <CoinTrending key={coin.item.coin_id} coin={coin.item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending;




// import UseAxios from "../hooks/UseAxios";
// import CoinTrending from "./CoinTrending";
// import BitCoin1 from '../image/BitCoin1.jpg';

// const Trending = () => {
//   const { response } = UseAxios('search/trending');
//   console.log(response);

//   return (
//     <div className="relative mt-8 flex flex-row bg-gradient-to-r from-gray-100 to-gray-300 p-4 rounded-lg shadow-lg">
//       {/* Background Image */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center rounded-lg" 
//         style={{ backgroundImage: `url(${BitCoin1})` }}
//       ></div>
      
//       {/* Black Overlay with Opacity */}
//       <div className="absolute inset-0 bg-black opacity-75 rounded-lg"></div>
      
//       {/* Content Overlay */}
//       <div className="relative z-10 w-full flex flex-col">
//         {/* Welcome Text */}
//         <div className="absolute left-6 top-0 text-gray-400 text-8xl font-bold ml-10 animate-fade-in flex items-center h-full">
//           <h1>
//           <span className="text-yellow-500">C</span>rypto
//           <span className="text-yellow-500">U</span>pdates
//           </h1>
//         </div>

//         <div className="w-full flex flex-row mt-8">
//           {/* Space between the image and the trending section */}
//           <div className="w-2/3 h-auto relative z-10">
//             {/* You could keep the image here if needed */}
//           </div>

//           {/* Trending Section */}
//           <div className="w-1/3 ml-8 relative z-10">
//             <h1 className="text-2xl mb-4 text-yellow-600">Trending</h1>
//             <div className="bg-transparent text-yellow-600 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl p-4">
//               {response && response.coins.map(coin => (
//                 <CoinTrending key={coin.item.coin_id} coin={coin.item} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Trending;