import axios from "axios";
import { useEffect, useState } from "react";


import './SearchCity.scss'
export default () => {

   const [city,setCity] = useState();
   const [results,setResults] = useState();
   const [citySelected,setCitySelected]= useState();
   
    const getCity = async () => {
        let {data} = await axios.get(`${import.meta.env.VITE_APP_SEARCH_CITY}${import.meta.env.VITE_APP_KEY}&q=${city}`)
        setResults(data)
    }

    useEffect(()=>{
        getCity();
    },[city])

    const cities = results?results.map(result => <span key={result.Key} className="itemCity" onClick={()=>{setCitySelected(result); setCity('')}}>{result.EnglishName},{result.Country.EnglishName}</span>):null
    
    return(
        <>
        <h1>Search city</h1>
        <div className="searchCities">
        <input className="inputSearch" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <div className="cities">{cities}</div>
        </div>
        </>
    )
}