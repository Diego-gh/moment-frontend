import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './translations/i18n';
import '@mantine/core/styles.css';
import AppLayout from './routes/layout/AppLayout';

const HomePage = React.lazy(() => import('./routes/home/HomePage'));
const LoginPage = React.lazy(() => import('./routes/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./routes/auth/RegisterPage'));
const ProfilePage = React.lazy(() => import('./routes/profile/ProfilePage'));
const PageNotFound = React.lazy(() => import('./routes/404/PageNotFound'));

const theme = createTheme({
  primaryColor: 'red',
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/:username' element={<ProfilePage />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
