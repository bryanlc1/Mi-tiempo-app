import axios from "axios";
import {useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import useTiempo from "../hooks/useTiempo";
import { getCityBytext } from "../services";
import './SearchCity.scss'

export default () => {

    const [city, setCity] = useState('');
    const [results, setResults] = useState();
    const [debounceChange]= useDebounce(city,500);
    const [loaded,setLoaded] = useState(false);
    const {setCitySelected } = useTiempo();


    const getCity = (event) => {
        setCity(event?.target.value);
        setLoaded(false);
        if(event?.target.value.length === 0){
            setResults([])
        }
    }

    useEffect(()=>{
        if(debounceChange && debounceChange.length>=3){
            getCityBytext(debounceChange).then(resp =>{
                setResults(resp);
                setLoaded(true);
            })
        }
        
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

    const notCities = results?.length === 0 && city !== '' && loaded

    const cities = results?.length !==0 && city !== '' && loaded
    

    return (
        <div className="searchCities">
           <div className="inputCities">
           <form onSubmit={handelsubmit}>
                <input placeholder="Search city" className="inputSearch" type="text" value={city} onChange={getCity} />
            </form>
            <div className="cities">
                {notCities && <span className="itemCity">No hay resultados</span>}
                {cities && (
                    <>
                    {results?.map((result, index) => <span key={index} className="itemCity" onClick={() => selectCity(result)}>{result.name},{result.sys.country}</span>)}
                    </>
                )}
            </div>
           </div>
        </div>
    )
}