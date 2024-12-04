export const selectDaysDrinking = (state) => state.water.daysDrinking;
export const selectChosenMonth = (state) => state.water.chosenMonth;
export const selectChosenDate = (state) => state.water.chosenDate; //Обрана дата
export const selectIsLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectWaterItems = (state) => state.water.items;
export const selectDayDetails = (state) => state.water.dayDetails;

export const selectWaterAmountPerDay = (state) => state.water.waterAmountPerDay;

// {
//   const today = new Date().toLocaleDateString("en-CA");
//   return state.water.waterAmount
//     .filter((item) => item.date.split("T")[0] === today)
//     .reduce((sum, item) => sum + item.amount, 0);
// };
