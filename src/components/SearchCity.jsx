import axios from "axios";
import {useEffect, useState } from "react";
import useTiempo from "../hooks/useTiempo";
import { useDebounce } from 'use-debounce';
import './SearchCity.scss'
export default () => {

    const [city, setCity] = useState('');
    const [results, setResults] = useState([]);
    const [debounceChange]= useDebounce(city,500);
    const {setCitySelected } = useTiempo();

    


    const getCity = async (event) => {
        setCity(event?.target.value);
        // let {data} = await axios.get(`${import.meta.env.VITE_APP_SEARCH_CITY}${import.meta.env.VITE_APP_KEY}&q=${event?.target.value}`)
   
            if(debounceChange && debounceChange.length>=3){
                try {
                    let { data } = await axios.get(`${import.meta.env.VITE_APP_SEARCH_CITY_2}${debounceChange}&appid=${import.meta.env.VITE_APP_KEY_2}`)
                setResults([data])
                } catch (error) {
                    setResults([])
                }
            }
    }

    useEffect(()=>{
    
            getCity()
        
     },[debounceChange])

    const handelsubmit = event => {
        event.preventDefault();
        setCitySelected(results[0]);
        setCity('');
        setResults('');
    }

    const selectCity = (result) => {
        setCitySelected(result);
        setCity('')
        setResults('')
    }

    const cities = results 
    ?
    results.map((result, index) => <span key={index} className="itemCity" onClick={() => selectCity(result)}>{result.name},{result.sys.country}</span>)
    : null

    return (
        <div className="searchCities">
           <div className="inputCities">
           <form onSubmit={handelsubmit}>
                <input placeholder="Search city" className="inputSearch" type="text" value={city} onChange={getCity} />
            </form>
            <div className="cities">{cities}</div>
           </div>
        </div>
    )
}