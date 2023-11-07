import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
