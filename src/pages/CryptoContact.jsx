import React from 'react'
import Footer from '../components/Footer'

const CryptoContact = () => {
  return (
    <div className="bg-gray-700 mx-auto my-10 pt-[5%] animate-fade-in">
      <div className="">
        <h1 className="text-gray-300 text-8xl font-bold">
          Contact <span className="text-yellow-500"> Us</span>
        </h1>
        {/* <p>Here you can filter cryptocurrencies based on various parameters.</p> */}
      </div>
      
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  )
}

export default CryptoContact