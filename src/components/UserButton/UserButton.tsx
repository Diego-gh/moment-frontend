import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../../api/user';
import authStore from '../../stores/auth';

const UserButton = () => {
  const navigate = useNavigate();

  const { currentUser, removeCurrentUser } = authStore();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      removeCurrentUser();
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  return (
    <>
      {currentUser && (
        <button onClick={() => logoutMutation.mutate()}>Logout</button>
      )}
    </>
  );
};

export default UserButton;
