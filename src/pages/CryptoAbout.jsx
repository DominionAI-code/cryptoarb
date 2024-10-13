import React from 'react';
import About from '../components/About';
import Footer from '../components/Footer';

const CryptoAbout = () => {
  return (
    <div className="min-h-[300vh] bg-gray-700 mx-auto my-10 pt-[5%] animate-fade-in">
      <div className="">
        <h1 className="text-gray-300 text-8xl font-bold">
          Crypto<span className="text-yellow-500">Info.</span>
        </h1>
        {/* <p>Here you can filter cryptocurrencies based on various parameters.</p> */}
      </div>
      
      <div className="mt-4">
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default CryptoAbout;
