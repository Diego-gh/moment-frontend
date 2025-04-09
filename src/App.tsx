import { Outlet } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import css from './App.module.css';

const App = () => {
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
