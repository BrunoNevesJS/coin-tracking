import React from 'react'

import { Routes, Route } from 'react-router-dom';
import { SignInRoutesTemplate } from './signInRoutes';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<SignInRoutesTemplate />}>
        <Route path='/' element={<p> signInRoute </p>} />
      </Route>

      <Route path='/register' element={<p> register </p>} />
      <Route path='*' element={<p> Pagina não encontrada </p>} />
    </Routes>
  )
}