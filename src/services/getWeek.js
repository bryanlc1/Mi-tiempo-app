import axios from "axios";

export const getDaysofWeek = async (citySelected) => {
   if(citySelected){
    let { data } = await axios.get(`${import.meta.env.VITE_APP_SEARCH_DAYS}${citySelected?.id}&appid=${import.meta.env.VITE_APP_KEY_2}`);
    let temporary = [];
    let newdays = [];
    let currentDay = data.list[0].dt_txt.substring(7, 10);

    for (let i = 0; i < data.list.length; i++) {
        if (currentDay === data.list[i].dt_txt.substring(7, 10)) {
            temporary = [...temporary, data.list[i]];
        } else {
            newdays.push(temporary);
            temporary = [];
            currentDay = data.list[i].dt_txt.substring(7, 10);
        }
    }
    return newdays
   }else{
       return[];
   }
}

