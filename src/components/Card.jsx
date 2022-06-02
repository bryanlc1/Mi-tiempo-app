import axios from "axios";
import { useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

import useTiempo from "../hooks/useTiempo";
import './Card.scss'

export default () => {

    const { citySelected, days, setDays } = useTiempo();

    const urlIcon = "http://openweathermap.org/img/wn/";
    const daysWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    useEffect(() => {
        thedays();
    }, [citySelected]);

    const today = new Date();
    const data = {
        day: ('0' + today.getDate()).slice(-2),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        dayWek: daysWeek[today.getUTCDay()],
        hour: today.getHours(),
        minutes: today.getMinutes()
    }

    const thedays = async () => {
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
        setDays(newdays);
    }

    const hoursCurrentDay = days[0]?.map((current, indx) =>
        <div className="hours" key={indx} item={current}>
            <span>{current.dt_txt.substring(11, 16)}</span>
            <img src={`${urlIcon}${current.weather[0].icon}.png`} />
            <span>{`${(current.main.temp - 273.15).toFixed(1)} ºC`}</span>
        </div>
    )

    const searchDayandNigth = days.map((current) =>
    current.filter((current) =>current.dt_txt.substring(8, 10) !== data.day &&  current.dt_txt.substring(11, 13) === "15"|| current.dt_txt.substring(11, 13) === "03")
)

    const allDays = searchDayandNigth.filter((current)=> current.length !== 0).map((current, index) =>
    current &&
        <Col key={index} className="cardAllDays" xs={12} >
            <span>{current[0]?.dt_txt.substring(0, 10)}</span>
            <span>
                <img src={`${urlIcon}${current[0]?.weather[0].icon}.png`} /> /
                <img src={`${urlIcon}${current[1]?.weather[0].icon}.png`} />
            </span>
            <span>{`${(current[0]?.main.temp_min - 273.15).toFixed(1)} ºC`} /
                {`${(current[1]?.main.temp_max - 273.15).toFixed(1)} ºC`}
            </span>
        </Col>
    )

    return (
        citySelected
        &&
        <>
            <Stack gap={4}>
                <Row className="cardi">
                    <Col xs={9} md={9}>
                        <h1>{`${(citySelected.main.temp - 273.15).toFixed(1)} ºC`}</h1>
                        <h5><FaMapMarkerAlt color="rgb(130, 170, 255)" /> {`${citySelected.name},${citySelected.sys.country}`}<br /></h5>
                        {`${data.dayWek}, ${data.day}/${data.month}/${data.year} ${data.hour}:${data.minutes}`}
                    </Col>
                    <Col xs={3} md={3} className="contIcon" >
                        <img className="icon" src={`${urlIcon}${citySelected.weather[0].icon}.png`} />
                        <span>{citySelected.weather[0].description}</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="temperatures">
                        <span>{`Temp max: ${(citySelected.main.temp_max - 273.15).toFixed(1)} ºC`}</span>
                        <span>{`Temp min: ${(citySelected.main.temp_min - 273.15).toFixed(1)} ºC`}</span>
                        <span>{`Temp humidity: ${citySelected.main.humidity} %`}</span>
                    </Col>
                </Row>
                <div className="contHours" >
                    {hoursCurrentDay}
                </div>
                <Row className="cardi">
                    <h5><FaCalendarAlt color="rgb(130, 170, 255)" /> Prevision Semanal</h5>
                    {allDays}
                </Row>
            </Stack>
        </>
    )
}