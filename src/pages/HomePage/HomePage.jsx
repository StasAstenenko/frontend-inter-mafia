import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <Section>
      <div className={styles.wrap}>
        <Container>
          <WelcomeSection className={styles.welcomeSection} />
        </Container>
        <AdvantagesSection className={styles.advantagesSection} />
      </div>
    </Section>
  );
};

export default HomePage;
