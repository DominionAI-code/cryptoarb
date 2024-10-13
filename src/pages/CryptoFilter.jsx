import FilterMarket from '../components/FilterMarket';
import Footer from '../components/Footer';

const CryptoFilter = () => {
  return (
    <div className=" mx-auto my-10 pt-[5%] bg-gray-700 animate-fade-in">
      <h1 className="text-gray-300 text-8xl font-bold">Crypto<span className='text-yellow-500'>Filter</span></h1>
      {/* <p>Here you can filter cryptocurrencies based on various parameters.</p> */}
      <div className='wrapper-container'>
        <FilterMarket />
      </div>
      <Footer />
    </div>
  );
};

export default CryptoFilter;