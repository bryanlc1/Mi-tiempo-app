import React, {useContext}from "react";
import tiempoContext from "../context/tiempo";

export default () => {
    return  useContext(tiempoContext);
}