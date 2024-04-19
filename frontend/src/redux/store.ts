import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  session: null,
  cart: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.authenticated = true;
    },
    removeSession: (state) => {
      state.session = null;
      state.authenticated = false;
      state.cart = [];
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// Export the actions generated by createSlice
export const { setSession, removeSession, updateCart } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});