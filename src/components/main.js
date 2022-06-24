import React from 'react';
import {Router, Routes , Route } from 'react-router-dom';

import Home from '../pages/Home';


const Main = () => {
  return (
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
        </Routes>
  );
}

export default Main;