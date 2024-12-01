import css from "./Section.module.css";

export const Section = ({ children }) => {
  return <section className={css.section}>{children}</section>;
};
