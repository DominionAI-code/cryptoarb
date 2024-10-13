import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Company Info */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">CryptoArb</h2>
          <p className="text-gray-400 leading-relaxed">
            CryptoArb is your trusted platform for discovering and capitalizing on cryptocurrency arbitrage opportunities.
            Track real-time price differences across multiple exchanges to maximize your trading profits.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="/faq" className="hover:text-yellow-500">FAQ</a></li>
            <li><a href="/blog" className="hover:text-yellow-500">Blog</a></li>
            <li><a href="/contact" className="hover:text-yellow-500">Contact Us</a></li>
            <li><a href="/privacy" className="hover:text-yellow-500">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-yellow-500">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 3: Subscribe to Newsletter */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">Stay Updated</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Subscribe to our newsletter to get the latest updates on arbitrage opportunities, market trends, and more.
          </p>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-600 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} CryptoArb By <span className='text-yellow-500'>DominionAI</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
