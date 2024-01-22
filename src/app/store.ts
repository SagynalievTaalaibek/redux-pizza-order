import { configureStore } from '@reduxjs/toolkit';
import { dishesReducer } from '../store/dishes/dishesSlice';
import { adminReducer } from '../store/admin/adminSlice';
import { orderReducer } from '../store/order/orderSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    admin: adminReducer,
    order: orderReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
