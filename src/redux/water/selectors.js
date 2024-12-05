export const selectDaysDrinking = (state) => state.water.daysDrinking;
export const selectChosenMonth = (state) => state.water.chosenMonth;
export const selectChosenDate = (state) => state.water.chosenDate; //Обрана дата
export const selectIsLoading = (state) => state.water.loading;
export const selectStatistics = (state) => state.water.statistics;
export const selectError = (state) => state.water.error;
export const selectWaterItems = (state) => state.water.items;
export const selectDayDetails = (state) => state.water.dayDetails;

export const selectWaterAmountPerDay = (state) => state.water.waterAmountPerDay;

