import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CoinContext = createContext();

const CoinContextProvider = (props) =>{

    const [coins, setCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchAllCoin = async () =>{
        const options = {
        method: 'GET',
        url: `${apiUrl}/markets?vs_currency=${currency.name}`,
        headers: {accept: 'application/json', 'x-cg-demo-api-key': `${apiKey}`}
        };

        axios
        .request(options)
        .then(function (response) {
            setCoins(response.data)
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    useEffect(()=>{fetchAllCoin()}, [currency])

    const contextValue = {
        coins, currency, setCurrency
    }

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;