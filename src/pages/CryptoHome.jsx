import Markets from '../components/Markets'
import Trending from '../components/Trending'
import Footer from '../components/Footer'

const CryptoHome = () => {
  return (
    <div className='bg-gray-800'>
      <Trending />
      <Markets />
      <Footer />
    </div>
  )
}

export default CryptoHome