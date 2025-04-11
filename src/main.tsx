import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './translations/i18n';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import App from './App';

const HomePage = React.lazy(() => import('./routes/home/HomePage'));
const LoginPage = React.lazy(() => import('./routes/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./routes/auth/RegisterPage'));
const ProfilePage = React.lazy(() => import('./routes/profile/ProfilePage'));

const theme = createTheme({
  primaryColor: 'cyan',
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/:username' element={<ProfilePage />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
