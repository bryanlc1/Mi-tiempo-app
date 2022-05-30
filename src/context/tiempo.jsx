import { createContext } from 'react'
import {useEffect, useState, useContext} from 'react'


const tiempoContext = createContext({});

export const TiempoProvider = ({children}) => {
    const [citySelected,setCitySelected] = useState({});
    const [days,setDays] = useState([]);

    return (
        <tiempoContext.Provider value={{citySelected, setCitySelected,days,setDays}}>
            {children}
        </tiempoContext.Provider>
    )
}

export default tiempoContext;
