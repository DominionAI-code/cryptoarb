import UseAxios from "../hooks/UseAxios";
import Coin from "./Coin";

const Markets = () => {
  const { response } = UseAxios('coins/markets?vs_currency=usd');

  return (
    <section className="mt-8 wrapper-container bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl mb-4 text-center md:text-left">Markets</h1>
      
      {/* Grid layout for responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {response && response.map(coin => (
          <Coin key={coin.id} coin={coin} />
        ))}
      </div>
    </section>
  );
};

export default Markets;





// import UseAxios from "../hooks/UseAxios";
// import Coin from "./Coin";

// const Markets = () => {
//   const { response } = UseAxios('coins/markets?vs_currency=usd');

//   return (
//     <section className="mt-8 wrapper-container bg-gray-900 text-white p-4 rounded-lg shadow-lg">
//       <h1 className="text-2xl mb-2">Markets</h1>
//       {response && response.map(coin => (
//         <Coin key={coin.id} coin={coin} />
//       ))}
//     </section>
//   );
// };

// export default Markets;
