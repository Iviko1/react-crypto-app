import { useContext, useEffect, useState } from 'react'
import './Coins.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Coins = () => {
  const {coins, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value)
    if(event.target.value === "")
      {
        setDisplayCoin(coins);
      }
  }

  const searchHandler = async (event) => {
    event.preventDefault();
    const filteredCoins = await coins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(filteredCoins)
  }

  useEffect(()=>{
    setDisplayCoin(coins)
  }, [coins])

  return (
    <div className='coins'>
      <div className='hero'>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} list='coinlist' type="text" placeholder='Search crypto...' required/>
          <datalist id="coinlist">
            {coins.map((item, index)=> (<option key={index} value={item.name}/>))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
        displayCoin.slice(0, 10).map((item, index) =>(
          <Link to={`/react-crypto-app/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image}/>
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_percentage_24h*100)/100}
            </p>
            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </Link>
        ))
        }
      </div>
    </div>
  )
}

export default Coins