import { useNavigate } from 'react-router';
import request from '../../api/util/request';

const UserButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    request
      .post('/user/logout')
      .then(() => {
        console.log('Logout successful');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserButton;
