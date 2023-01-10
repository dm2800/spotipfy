import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Search from "./pages/Search";
import Pay from "./pages/Pay";


function App() {
  
    return (
      <BrowserRouter>
      <Routes>
          <Route path="/pay" element={<Pay/>}></Route>
          <Route path="/" element={<Search/>}></Route>
      </Routes>
  </BrowserRouter>
    );
}

export default App;
