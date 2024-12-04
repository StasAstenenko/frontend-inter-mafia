import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = ({ className = "" }) => {
  return (
    <>
      <NavLink to="/">
        <div className={`${styles.logo} ${className}`}>aquatrack</div>
      </NavLink>
    </>
  );
};

export default Logo;
