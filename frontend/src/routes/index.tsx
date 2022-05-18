import React from 'react'

import { Routes, Route } from 'react-router-dom';
import { SignInRoutesTemplate } from './signInRoutes';

import { RegisterPage } from 'pages/register';
import { HomePage } from 'pages/home';
import { NotFoundPage } from 'pages/not-found';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<SignInRoutesTemplate />}>
        <Route path='/' element={<HomePage />} />
      </Route>

      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}