import css from "./Section.module.css";

const Section = ({ children, className = "" }) => {
  return (
    <section className={`${css.section} ${className}`}>{children}</section>
  );
};

export default Section;
