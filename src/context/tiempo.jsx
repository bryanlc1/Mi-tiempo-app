import { createContext } from 'react'
import {useEffect, useState, useContext} from 'react'


const tiempoContext = createContext();

export const TiempoProvider = ({children}) => {
    const [citySelected,setCitySelected] = useState({});

    console.log('selecionadaaa',citySelected)
    return (
        <tiempoContext.Provider value={{citySelected, setCitySelected}}>
            {children}
        </tiempoContext.Provider>
    )
}

export default tiempoContext;
