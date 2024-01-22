import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AdminState {
  isAdmin: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, {payload: isAdmin}: PayloadAction<boolean>) => {
      state.isAdmin = isAdmin;
    },
  },
});

export const adminReducer = adminSlice.reducer;
export const { setAdmin } = adminSlice.actions;
export const selectIsAdmin = (state: RootState) => state.admin.isAdmin;