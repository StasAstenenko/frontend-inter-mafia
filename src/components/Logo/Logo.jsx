import styles from './Logo.module.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`}>aquatrack</div>
  );
};

export default Logo;
