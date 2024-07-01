import { useContext, useEffect, useState } from 'react';
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import axios from 'axios';

const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);

  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;


  const fetchCoinData = async () =>{
    const options = {
      method: 'GET',
      url: `${apiUrl}/${coinId}`,
      headers: {accept: 'application/json', 'x-cg-demo-api-key': `${apiKey}`}
      };

      axios
      .request(options)
      .then(function (response) {
        setCoinData(response.data)
      })
      .catch(function (error) {
          console.error(error);
      });
  }

  const fetchHistoricalData = async () =>{
    const options = {
      method: 'GET',
      url: `${apiUrl}/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      headers: {accept: 'application/json', 'x-cg-demo-api-key': `${apiKey}`}
      };

      axios
      .request(options)
      .then(function (response) {
        setHistoricalData(response.data)
      })
      .catch(function (error) {
          console.error(error);
      });
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if(coinData && historicalData){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large}/>
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className='spinner'>
      <div className='spin'></div>
    </div>
  )
}

export default Coin