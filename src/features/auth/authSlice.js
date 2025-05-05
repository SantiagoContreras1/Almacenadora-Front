import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAdmin = action.payload?.role === "ADMIN_ROLE";
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.isAdmin = false;
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const storedUser = localStorage.getItem("user");
      console.log("Usuario almacenado en localStorage:", storedUser);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        state.user = user;
        state.isAdmin = user?.role === "ADMIN_ROLE";
      } else {
        state.user = null;
        state.isAdmin = false
      }
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
