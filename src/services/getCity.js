import axios from "axios";

export const getCityBytext = async (city)=>{
    const url = `${import.meta.env.VITE_APP_SEARCH_CITY_2}q=${city}&appid=${import.meta.env.VITE_APP_KEY_2}`
    try {
        let { data } = await axios.get(url)
    return [data]
    } catch (error) {
    return []
    }
}

export const getCityByCords = async (lat,lon)=>{
    const url = `${import.meta.env.VITE_APP_SEARCH_CITY_2}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_APP_KEY_2}`
    try {
        let { data } = await axios.get(url)
    return data
    } catch (error) {
    return {}
    }
}

