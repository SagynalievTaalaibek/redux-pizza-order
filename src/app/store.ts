import { configureStore } from '@reduxjs/toolkit';
import { dishesReducer } from '../store/dishes/dishesSlice';
import { adminReducer } from '../store/admin/adminSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    admin: adminReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
