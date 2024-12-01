import css from "./AdvantagesSection.module.css";

import avatar1 from "./../../img/advantages/Avatar1.png";
import avatar2 from "./../../img/advantages/Avatar2.png";
import avatar3 from "./../../img/advantages/Avatar3.png";

const AdvantagesSection = () => {
  return (
    <div className={css.bgimage}>
      <div className={css.advantages_section}>
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
