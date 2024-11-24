import styles from './Logo.module.css';

const Logo = ({ text = 'aquatrack', className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`}>{text}</div>
  );
};

export default Logo;
