import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@mantine/core/styles.css';
import AppLayout from './routes/layout/AppLayout';

const HomePage = React.lazy(() => import('./routes/home/HomePage'));
const AuthPage = React.lazy(() => import('./routes/auth/AuthPage'));
const ProfilePage = React.lazy(() => import('./routes/profile/ProfilePage'));
const PageNotFound = React.lazy(() => import('./routes/404/PageNotFound'));

const theme = createTheme({
  primaryColor: 'red',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/:username' element={<ProfilePage />} />
          </Route>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
