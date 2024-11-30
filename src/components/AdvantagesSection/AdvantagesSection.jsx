import css from "./AdvantagesSection.module.css";
import girlM from "./../../img/advantages/girlM.webp";
import girlM2x from "./../../img/advantages/girlM@2x.webp";
import girlD2x from "./../../img/advantages/girlD@2x.webp";
import girlD from "./../../img/advantages/girlD.webp";
import girlT2x from "./../../img/advantages/girlT@2x.webp";
import girlT from "./../../img/advantages/girlT.webp";
import avatar1 from "./../../img/advantages/Avatar1.png";
import avatar2 from "./../../img/advantages/Avatar2.png";
import avatar3 from "./../../img/advantages/Avatar3.png";

const AdvantagesSection = ({ className = "" }) => {
  return (
    <div className={`${css.advantagesSection} ${className}`}>
      <div className={css.advantages_section}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${girlD} 1x, ${girlD2x} 2x`}
          />
          <source
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={`${girlT} 1x, ${girlT2x} 2x`}
          />
          <source
            media="(max-width: 767px)"
            srcSet={`${girlM} 1x, ${girlM2x} 2x`}
          />
          <img
            className={css.girl}
            src={girlM}
            alt="Girl drink water"
            loading="lazy"
          />
        </picture>
        <div className={css.customers}>
          <div>
            <ul className={css.customers_list}>
              <li className={css.customers_item}>
                <img className={css.avatar} src={avatar1} alt="avatar1" />
              </li>
              <li className={css.customers_item}>
                <img className={css.avatar} src={avatar2} alt="avatar2" />
              </li>
              <li className={css.customers_item}>
                <img className={css.avatar} src={avatar3} alt="avatar3" />
              </li>
            </ul>
          </div>

          <div>
            <p className={css.customers_text}>
              Our <span className={css.span}>happy </span>
              customers
            </p>
          </div>
        </div>

        <div className={css.benefits}>
          <ul className={css.benefits_list}>
            <li className={css.benefits_item}>
              <div className={css.flex}>
                <div className={css.ellipse13}></div>
                <p className={css.text}>Habit drive</p>
              </div>
            </li>
            <li className={css.benefits_item}>
              <p className={css.text}>View statistics</p>
            </li>
            <li className={css.benefits_item}>
              <p className={css.text}>Personal rate setting</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
