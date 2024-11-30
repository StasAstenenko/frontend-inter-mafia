import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <>
      <section className={css.container}>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </section>
    </>
  );
};

export default TrackerPage;
