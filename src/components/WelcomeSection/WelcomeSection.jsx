import Logo from '../Logo/Logo';
import styles from './WelcomeSection.module.css';

const WelcomeSection = ({ className = '' }) => {
  return (
    <div className={`${styles.welcomeSection} ${className}`}>
      <Logo className={styles.logo} />
      <div className={styles.contentWrapper}>
        <div className={styles.headersWrapper}>
          <h1 className={styles.title}>Water consumption tracker</h1>
          <h2 className={styles.subtitle}>
            Record daily water intake and track
          </h2>
        </div>
        <div className={styles.buttonsWrapper}>
          <a href="/sign-up" className={`${styles.btn} ${styles.btnPrimary}`}>
            Try&nbsp;tracker
          </a>
          <a href="/sign-in" className={`${styles.btn} ${styles.btnSecondary}`}>
            Sign&nbsp;In
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
