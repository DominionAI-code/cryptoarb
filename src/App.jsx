import { BrowserRouter, Route, Routes } from "react-router-dom";
import CryptoDetails from "./pages/CryptoDetails";
import CryptoHome from "./pages/CryptoHome";
import Navbar from "./components/Navbar";
import CryptoFilter from "./pages/CryptoFilter";
import CryptoAbout from "./pages/CryptoAbout";
import CryptoContact from "./pages/CryptoContact";
// import CoinDetails from './pages/CoinDetails';

const App = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<CryptoHome/>} />
        <Route path="/coin/:id" element={ <CryptoDetails/>} />
        <Route path="/cryptofilter" element={<CryptoFilter />} />
        {/* <Route path="/coin/:id" element={<CoinDetails />} /> */}
        <Route path="/cryptoabout" element={<CryptoAbout />} />
        <Route path="/cryptocontact" element={<CryptoContact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App