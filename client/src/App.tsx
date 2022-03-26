import React, { useState } from 'react';
import { RegForm } from './components/regForm';
import { LoginForm } from './components/logInForm';
import { MainPage } from './components/mainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

export function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuth ? (<MainPage />) : (<LoginForm />)} />
        <Route path='/register' element={<RegForm />} />
      </Routes>
    </BrowserRouter>
  );
}


