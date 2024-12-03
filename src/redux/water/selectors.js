export const selectDaysDrinking = (state) => state.water.daysDrinking;
export const selectChosenMonth = (state) => state.water.chosenMonth;
export const selectChosenDate = (state) => state.water.chosenDate; //Обрана дата
export const selectIsLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectWaterItems = (state) => state.water.items;

export const selectWaterAmountForToday = (state) => {
  const today = new Date().toLocaleDateString("en-CA");
  const dayDetails = state.water.dayDetails;
  const todayData = dayDetails.filter((detail) => {
    const recordDate = new Date(detail.date).toLocaleDateString("en-CA");
    return recordDate === today;
  });
  const totalWaterAmount = todayData.reduce(
    (total, record) => total + record.amount,
    0
  );
  return totalWaterAmount;
};
