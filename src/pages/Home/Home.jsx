import "./Home.css"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='home'>
      <div className='home-container'>
        <h1>Crypto Statistics</h1>
        <p>Welcome to cryptocurrency statistics. Built by IveX</p>
        <p>Based on CoinsGecko API</p>
        <Link to={'/react-crypto-app/coins'}><button>See Coins</button></Link>
      </div>
    </div>
  )
}

export default Home