import { createContext } from 'react'
import { useEffect, useState, useContext } from 'react'
import { getCityByCords } from '../services';
const tiempoContext = createContext({});

export const TiempoProvider = ({ children }) => {
    const [citySelected, setCitySelected] = useState();
    const [days, setDays] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            getCityByCords(position.coords.latitude, position.coords.longitude)
                .then((data) => setCitySelected(data))
        })
    }, [])

    return (
        <tiempoContext.Provider value={{ citySelected, setCitySelected, days, setDays }}>
            {children}
        </tiempoContext.Provider>
    )
}

export default tiempoContext;
