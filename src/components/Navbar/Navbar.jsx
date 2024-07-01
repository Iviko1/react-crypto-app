import './Navbar.css'
import logo from '../../assets/logo.svg'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event) =>{
    switch(event.target.value){
      case "usd":{
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
      case "eur":{
        setCurrency({name: "eur", symbol: "€"});
        break;
      }
      case "gel":{
        setCurrency({name: "gel", symbol: "₾"});
        break;
      }
      default : {
        setCurrency({name: "usd", symbol: "$"});
        break;
      }
    }
  }

  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img src={logo} alt="" className='logo'/>
      </Link>
        <ul>
           <Link to={'/'}><li>Home</li></Link> 
           <Link to={'/coins'}><li>Coins</li></Link>
        </ul>
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gel">GEL</option>
            </select>
        </div>
    </div>
  )
}

export default Navbar