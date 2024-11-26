import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <WelcomeSection className={styles.welcomeSection} />
      <AdvantagesSection className={styles.advantagesSection} />
    </div>
  );
};

export default HomePage;
