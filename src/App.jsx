import Navbar from "./components/Navbar/Navbar"
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home"
import Coins from './pages/Coins/Coins'
import Coin from './pages/Coin/Coin'
import Footer from "./components/Footer/Footer"

const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="react-crypto-app" element={<Home/>}></Route>
        <Route path="react-crypto-app/coins" element={<Coins/>}></Route>
        <Route path="react-crypto-app/coin/:coinId" element={<Coin/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App