export const selectDaysDrinking = (state) => state.water.daysDrinking; // Дні пиття води
export const selectChosenMonth = (state) => state.water.chosenMonth;
export const selectChosenDate = (state) => state.water.chosenDate; //Обрана дата
export const selectIsLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectCurrentAmountWater = (state) =>
  state.water.currentAmountWater;
