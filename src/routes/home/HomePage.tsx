import authStore from '../../stores/auth';

const HomePage = () => {
  const { currentUser } = authStore();

  return (
    <div>
      <h1>Home</h1>
      <p>
        {currentUser
          ? `Welcome back, ${currentUser.displayName}!`
          : 'Welcome, Guest!'}
      </p>
    </div>
  );
};

export default HomePage;
