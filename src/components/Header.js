import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>Covid Records</h1>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/form">
              Form
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/summary">
              Summary
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
