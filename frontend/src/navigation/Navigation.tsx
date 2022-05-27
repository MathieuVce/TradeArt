import React from 'react';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import App from "../roots/App";
import Home from "../roots/Home";
import Login from "../roots/Login";
import NoPage from "../roots/NoPage";
import Register from "../roots/Register";
import Password from "../roots/Password";

const Navigation: React.FunctionComponent = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='password' element={<Password/>}/>
          </Route>
          <Route path='/home' element={<Home/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    );
};

export default Navigation
