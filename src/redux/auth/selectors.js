//селектори
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthIsRegisteredSuccess = (state) =>
  state.auth.isRegisteredSuccess;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
