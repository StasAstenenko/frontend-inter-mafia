export const selectDaysDrinking = (state) => state.water.daysDrinking;
export const selectChosenMonth = (state) => state.water.chosenMonth;
export const selectChosenDate = (state) => state.water.chosenDate; //Обрана дата
export const selectIsLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectWaterItems = (state) => state.water.items;
export const selectDayDetails = (state) => state.water.dayDetails;

export const selectTotalWaterAmountToday = (state) => {
  const today = new Date().toLocaleDateString("en-CA");
  const waterAmount = state.water.items;

  if (!Array.isArray(waterAmount)) {
    return 0;
  }

  return waterAmount
    .filter((item) => item.date === today)
    .reduce((sum, item) => sum + item.amount, 0);
};
