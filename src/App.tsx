import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import authStore from './stores/auth';
import { getCurrentUser } from './api/user';
import NavBar from './components/NavBar/NavBar';
import css from './App.module.css';

const App = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = authStore();

  const fetchCurrentUser = useMutation({
    mutationFn: getCurrentUser,
    onSuccess: (data) => {
      console.log('Current user fetched:', data);
      setCurrentUser(data);
    },
    onError: (error) => {
      console.error('Failed to fetch current user:', error);
      // Optionally, you can handle the case where the user is not logged in
      setCurrentUser(null);
      navigate('/login'); // Redirect to login if fetching current user fails
    },
  });

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser.mutate();
    }
  }, []);

  return (
    <div className={css.container}>
      <NavBar />
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
