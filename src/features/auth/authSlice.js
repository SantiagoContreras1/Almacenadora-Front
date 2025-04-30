import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const storedUser = localStorage.getItem("user");
      console.log('Usuario almacenado en localStorage:', storedUser); 
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      } else {
        state.user = null;
      }
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
<<<<<<< HEAD
=======

>>>>>>> f4dd8512b13eecc27783218736121f6a9486b8c6
