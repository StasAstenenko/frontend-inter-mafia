export const selectDaysNotAsInWeek = (state) => state.settings.DaysNotAsInWeek; // Чи виставляти дні без врахування, як вони в тижні
export const selectSundayFirst = (state) => state.settings.SundayFirst; // Встановити Неділю першим днем тижня
export const selectUser = (state) => state.settings.user;
export const selectAvatarUrl = (state) => state.settings.user.avatarURL;
export const selectName = (state) => state.settings.user.name;
export const selectEmail = (state) => state.settings.user.email;
export const selectDailyNorm = (state) => state.settings.user.dailyNorm;
export const selectWeight = (state) => state.settings.user.weight;
export const selectActiveTime = (state) => state.settings.user.activeTime;
