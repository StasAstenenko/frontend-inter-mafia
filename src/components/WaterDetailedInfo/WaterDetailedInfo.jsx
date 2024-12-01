import UserPanel from "../../components/UserPanel/UserPanel.jsx";
import DailyInfo from "../DailyInfo/DailyInfo.jsx";
import MonthInfo from "../../components/MonthInfo/MonthInfo.jsx";
import Container from "../../components/Container/Container.jsx";
import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <Container className={css.container}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </Container>
  );
};

export default WaterDetailedInfo;
