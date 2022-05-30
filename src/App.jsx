import React, {useEffect, useState } from "react"

import { Col, Container, Row } from "react-bootstrap";

import { TiempoProvider } from './context/tiempo'
import useTiempo from "./hooks/useTiempo";
import SearchCity from "./components/SearchCity";
import Card from "./components/Card";

import './App.scss'

function App() {
  
const {citySelected} = useTiempo();

return (
    <>
      <TiempoProvider>
        <Container className="cont">
        <SearchCity />
        <Card/>
        </Container>
      </TiempoProvider>
    </>
  )
}

export default App
