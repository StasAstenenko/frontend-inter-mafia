import styles from './AdvantagesSection.module.css';

const AdvantagesSection = ({ className = '' }) => {
  return (
    <div className={`${styles.advantagesSection} ${className}`}>
      Advantages Section
    </div>
  );
};

export default AdvantagesSection;
