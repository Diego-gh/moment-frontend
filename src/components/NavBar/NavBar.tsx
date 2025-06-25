import css from './NavBar.module.css';
import UserButton from '../UserButton/UserButton';

const NavBar = () => {
  return (
    <div className={css.container}>
      <div>Nav Bar</div>
      <UserButton />
    </div>
  );
};

export default NavBar;
