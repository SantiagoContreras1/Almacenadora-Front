import { createSlice } from "@reduxjs/toolkit";



const notificationSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    setNotifications: (state, action) => {
      const { message } = action.payload;

      const exists = state.some((notif) => notif.message === message);
      if (!exists) {
        state.unshift(action.payload);

       
      }
    },

    clearNotifications: () => {
      return [];
    },
  },
});

export const { setNotifications, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
