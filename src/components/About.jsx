import React from 'react';

const About = () => {
  return (
    <div className="py-16 px-8 lg:px-32">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">About CryptoArb</h1>
        <p className="text-lg text-gray-300">
          Your trusted platform for discovering and capitalizing on cryptocurrency arbitrage opportunities.
        </p>
      </section>

      {/* First Section - Left Aligned */}
      <section className="mb-12 max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg border border-yellow-600 animate-float-left">
        <h2 className="text-3xl font-semibold text-yellow-500 mb-6">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          At CryptoArb, we aim to empower traders, both novice and expert, with cutting-edge tools to exploit price
          disparities in the cryptocurrency markets. Our goal is to provide real-time data across multiple exchanges
          to ensure that you can trade efficiently and profitably.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4 text-lg">
          We believe that everyone should have access to the financial freedom offered by cryptocurrency arbitrage, 
          and we work relentlessly to ensure our platform is fast, reliable, and easy to use.
        </p>
      </section>

      {/* Second Section - Right Aligned */}
      <section className="mb-12 ml-auto max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg border border-yellow-600 animate-float-right">
        <h2 className="text-3xl font-semibold text-yellow-500 mb-6">What is Crypto Arbitrage?</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          Cryptocurrency arbitrage is a strategy that takes advantage of price differences between exchanges. As
          cryptocurrency prices can vary between exchanges due to market inefficiencies, arbitrageurs buy low on one
          exchange and sell high on another. This creates an opportunity for risk-free profit, provided you act
          quickly and have access to accurate, real-time data.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4 text-lg">
          With CryptoArb, we simplify the process by automatically tracking price differences and giving you the
          data you need to seize profitable opportunities before they vanish.
        </p>
      </section>

      {/* Third Section - Left Aligned */}
      <section className="mb-12 max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg border border-yellow-600 animate-float-left">
        <h2 className="text-3xl font-semibold text-yellow-500 mb-6">Why Choose CryptoArb?</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-4 text-lg">
          <li>
            <span className="font-bold text-yellow-700">Real-Time Monitoring:</span> Our system continuously scans major exchanges, ensuring you
            have the most up-to-date information at your fingertips.
          </li>
          <li>
            <span className="font-bold text-yellow-700">User-Friendly Interface:</span> Whether you're a beginner or a pro, our platform is designed
            to make arbitrage easy and accessible with an intuitive interface.
          </li>
          <li>
            <span className="font-bold text-yellow-700">Comprehensive Exchange Coverage:</span> We support a wide array of exchanges and
            cryptocurrencies, giving you ample opportunities for arbitrage across the globe.
          </li>
          <li>
            <span className="font-bold text-yellow-700">Secure Transactions:</span> We use top-tier encryption and security protocols to ensure your
            trades and data are protected at all times.
          </li>
          <li>
            <span className="font-bold text-yellow-700">Actionable Insights:</span> Beyond just data, we provide insights into market trends, enabling
            you to make informed decisions on when and where to trade.
          </li>
        </ul>
      </section>

      {/* Fourth Section - Right Aligned */}
      <section className="mb-12 ml-auto max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg border border-yellow-600 animate-float-right">
        <h2 className="text-3xl font-semibold text-yellow-500 mb-6">Our Team</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          CryptoArb is backed by a team of seasoned professionals in blockchain technology, financial analysis, and
          software development. We are driven by a passion for innovation and a commitment to creating an ecosystem
          where traders of all levels can thrive. With years of experience in the crypto industry, we are dedicated
          to offering a platform that is not only powerful but also secure and easy to use.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4 text-lg">
          Our experts are continuously working on refining the platform to stay ahead of market trends, ensuring you
          get the best possible arbitrage opportunities at any given time.
        </p>
      </section>

      {/* Fifth Section - Centered */}
      <section className="clear-both text-center mt-16">
        <p className="text-xl font-semibold text-gray-300">
          Ready to start capitalizing on crypto arbitrage opportunities?
        </p>
        <p className="text-yellow-500 text-lg mt-4">
          <a href="/" className="underline hover:text-yellow-400">
            Join CryptoArb today
          </a> and gain an edge in the fast-paced world of cryptocurrency trading.
        </p>
      </section>
    </div>
  );
};

export default About;
