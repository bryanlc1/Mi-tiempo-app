import React from "react"

import SearchCity from "./components/SearchCity";
import { TiempoProvider } from './context/tiempo'

function App() {
  return (
    <>
      <TiempoProvider>
        <SearchCity />
      </TiempoProvider>
    </>
  )
}

export default App
