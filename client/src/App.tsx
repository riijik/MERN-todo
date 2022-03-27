import React, { createContext, useState } from 'react';
import { RegForm } from './components/regForm';
import { LoginForm } from './components/logInForm';
import { MainPage } from './components/mainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

interface Context {
  username?: string,
  password?: string
}

export const MyContext = React.createContext<Context | null>(null)

export function App() {
  const [credentialState, setCredentialState] = useState({
    // username: "Rodger",
    // password: "123"
  })

  return (
    <MyContext.Provider value={credentialState}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={(<LoginForm />)} />
          <Route path='/register' element={<RegForm />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}


