import logo from './logo.svg';
import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import FormValid from "./components/formValid";
import FormData from "./components/formData";
import ViewData from "./components/viewData";


function App() {
    return (
        <Routes>
            <Route path="/" element={<FormValid />} />
            <Route path="/formValid/:id" element={<FormValid />} />
            <Route path="/FormData" element={<FormData />} />
            <Route path="/viewData/:id" element={<ViewData />} />
        </Routes>
    );
}

export default App;
