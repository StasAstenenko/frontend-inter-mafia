import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import css from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <>
      <section className={css.container}>
        <WaterMainInfo />
      </section>
    </>
  );
};

export default TrackerPage;
