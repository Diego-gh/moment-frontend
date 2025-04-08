import { useParams } from 'react-router';

const ProfilePage = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>Profile Page of {username}</h1>
      <p>This is the profile page.</p>
    </div>
  );
};

export default ProfilePage;
