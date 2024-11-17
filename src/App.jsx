import { HashRouter, Routes, Route } from 'react-router-dom';
import CryptoDetails from "./pages/CryptoDetails";
import CryptoHome from "./pages/CryptoHome";
import Navbar from "./components/Navbar";
import CryptoFilter from "./pages/CryptoFilter";
import CryptoAbout from "./pages/CryptoAbout";
import CryptoContact from "./pages/CryptoContact";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CryptoHome />} />
        <Route path="/coin/:id" element={<CryptoDetails />} />
        <Route path="/cryptofilter" element={<CryptoFilter />} />
        <Route path="/cryptoabout" element={<CryptoAbout />} />
        <Route path="/cryptocontact" element={<CryptoContact />} />
      </Routes>
    </HashRouter>
  );
}

export default App;