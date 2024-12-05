import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import css from "./AdvantagesSection.module.css";

import avatar1M from "./../../img/advantages/avatar1M.webp";
import avatar1M2x from "./../../img/advantages/avatar1M@2x.webp";
import avatar1D from "./../../img/advantages/avatar1D.webp";
import avatar1D2x from "./../../img/advantages/avatar1D@2x.webp";
import avatar2M from "./../../img/advantages/avatar2M.webp";
import avatar2M2x from "./../../img/advantages/avatar2M@2x.webp";
import avatar2D from "./../../img/advantages/avatar2D.webp";
import avatar2D2x from "./../../img/advantages/avatar2D@2x.webp";
import avatar3M from "./../../img/advantages/avatar3M.webp";
import avatar3M2x from "./../../img/advantages/avatar3M@2x.webp";
import avatar3D from "./../../img/advantages/avatar3D.webp";
import avatar3D2x from "./../../img/advantages/avatar3D@2x.webp";

import { selectAllUsers } from "../../redux/auth/selectors.js";
import { getAllUsers } from "../../redux/auth/operations.js";
import { useLanguage } from "../../locales/langContext.jsx";

const AdvantagesSection = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const count = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className={css.bgimage}>
      <div className={css.advantages_section}>
        <div className={css.customers}>
          <div>
            <ul className={css.customers_list}>
              <li className={css.customers_item}>
                <picture>
                  <source
                    srcSet={`${avatar1M2x} 2x, ${avatar1M} 1x`}
                    media="(max-width: 767px)"
                  />
                  <source
                    srcSet={`${avatar1D2x} 2x, ${avatar1D} 1x`}
                    media="(min-width: 768px)"
                  />
                  <img src={avatar1D} alt="avatar1" />
                </picture>
              </li>
              <li className={css.customers_item}>
                <picture>
                  <source
                    srcSet={`${avatar2M2x} 2x, ${avatar2M} 1x`}
                    media="(max-width: 767px)"
                  />
                  <source
                    srcSet={`${avatar2D2x} 2x, ${avatar2D} 1x`}
                    media="(min-width: 768px)"
                  />
                  <img src={avatar2D} alt="avatar2" />
                </picture>
              </li>
              <li className={css.customers_item}>
                <picture>
                  <source
                    srcSet={`${avatar3M2x} 2x, ${avatar3M} 1x`}
                    media="(max-width: 767px)"
                  />
                  <source
                    srcSet={`${avatar3D2x} 2x, ${avatar3D} 1x`}
                    media="(min-width: 768px)"
                  />
                  <img src={avatar3D} alt="avatar3" />
                </picture>
              </li>
            </ul>
          </div>

          <div>
            <p className={`${css.customers_text}`}>
              {t("Our")}{" "}
              {!count ? " " : <span className={css.count}>{count}</span>}{" "}
              <span className={css.span}>{t("Happy")}</span>
              <br />
              {t("Customers")}
            </p>
          </div>
        </div>

        <div className={css.benefits}>
          <ul className={css.benefits_list}>
            <li className={css.benefits_item}>
              <div className={css.flex}>
                <div className={css.ellipse13}></div>
                <p className={css.text}>{t("HabitDrive")}</p>
              </div>
            </li>
            <li className={css.benefits_item}>
              <p className={css.text}>{t("ViewStatistics")}</p>
            </li>
            <li className={css.benefits_item}>
              <p className={css.text}>{t("PersonalSettings")}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
