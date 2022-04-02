import React from 'react';
import { RegForm } from './components/regForm';
import { LoginForm } from './components/logInForm';
import { MainPage } from './components/mainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


export function App() {
  console.log(localStorage)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<RegForm />} />
        <Route path='/main' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}


