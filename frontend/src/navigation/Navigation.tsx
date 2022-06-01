import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import React, { useContext, useEffect } from 'react';

import App from "../roots/App";
import Home from "../roots/Home";
import Login from "../roots/Login";
import NoPage from "../roots/NoPage";
import Register from "../roots/Register";
import Password from "../roots/Password";
import UserCart from "../roots/User/Cart";
import UserWorks from "../roots/User/Work";
import { RequireAuth } from "./RequireAuth";
import UserProfil from "../roots/User/Profil";
import ArtistSale from "../roots/Artist/Sale";
import ArtistWork from "../roots/Artist/Work";
import ArtistProfil from "../roots/Artist/Profil";
import { ClientContext } from '../contexts/ClientContext';

const Navigation: React.FunctionComponent = () => {
  const { autolog } = useContext(ClientContext);

  useEffect(() => {
    (async () => {
      await autolog();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='password' element={<Password/>}/>
        </Route>
        <Route path='/home' element={ <RequireAuth element={<Home/>}/>}>
            <Route path='artist/work' element={<ArtistWork/>}/>
            <Route path='artist/sale' element={<ArtistSale/>}/>
            <Route path='artist/profil' element={<ArtistProfil/>}/>
            <Route path='user/works' element={<UserWorks/>}/>
            <Route path='user/cart' element={<UserCart/>}/>
            <Route path='user/profil' element={<UserProfil/>}/>
          </Route>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation
