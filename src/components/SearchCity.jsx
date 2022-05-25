import axios from "axios";
import { useContext, useEffect, useState } from "react";
import tiempoContext from "../context/tiempo";

import './SearchCity.scss'
export default () => {

   const [city,setCity] = useState();
   const [results,setResults] = useState();

   const {setCitySelected} = useContext(tiempoContext);
   
    const getCity = async (event) => {
        setCity(event?.target.value);
        // let {data} = await axios.get(`${import.meta.env.VITE_APP_SEARCH_CITY}${import.meta.env.VITE_APP_KEY}&q=${event?.target.value}`)
        let {data} = await axios.get(`${import.meta.env.VITE_APP_SEARCH_CITY_2}${event?.target.value}&appid=${import.meta.env.VITE_APP_KEY_2}`)
       
        setResults(data?[data]:[])
    }


    const selectCity = (result) => {
        setCitySelected(result);
        setCity('')
        setResults('')
    }
    
    const cities = results?results.map(result => <span key={result.Key} className="itemCity" onClick={()=>selectCity(result)}>{result.name},{result.sys.country}</span>):null
   

    return(
        <>
        <h1>Search city</h1>
        <div className="searchCities">
        <input className="inputSearch" type="text" value={city} onChange={getCity} />
        <div className="cities">{cities}</div>
        </div>
        {city}
        </>
    )
}