import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createOrder, deleteOrderData, fetchNewOrders } from './orderThunks';
import { Dish, Order, OrderDish } from '../../types';

interface OrderState {
  orderDishes: OrderDish[];
  newOrders: Order[];
  createOrderLoading: boolean;
  fetchOrderLoading: boolean;
  deleteOrderLoading: boolean | string;
  modalShow: boolean;
}

const initialState: OrderState = {
  orderDishes: [],
  newOrders: [],
  createOrderLoading: false,
  fetchOrderLoading: false,
  deleteOrderLoading: false,
  modalShow: false,
};

const orderSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<Dish>) => {
      const index = state.orderDishes.findIndex(orderDish => orderDish.dish.id === dish.id);
      if (index !== -1) {
        state.orderDishes[index].amount++;
      } else {
        state.orderDishes.push({
          amount: 1,
          dish,
        });
      }
    },
    updateOrder: (state, { payload: dishes }: PayloadAction<Dish[]>) => {
      const newCartDishes: OrderDish[] = [];
      state.orderDishes.forEach((cartDish) => {
        const existingDish = dishes.find(dish => dish.id === cartDish.dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish,
        });
      });

      state.orderDishes = newCartDishes;
    },
    clearOrder: (state) => {
      state.orderDishes = [];
    },
    deleteOrder: (state, { payload: dish }: PayloadAction<Dish>) => {
      state.orderDishes = state.orderDishes.filter(order => order.dish.id !== dish.id);
    },
    toggleModal: (state) => {
      state.modalShow = !state.modalShow;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, state => {
      state.createOrderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, state => {
      state.createOrderLoading = false;
    });
    builder.addCase(createOrder.rejected, state => {
      state.createOrderLoading = false;
    });
    builder.addCase(fetchNewOrders.pending, state => {
      state.fetchOrderLoading = true;
    });
    builder.addCase(fetchNewOrders.fulfilled, (state, {payload: newOrder}) => {
      state.fetchOrderLoading = false;
      state.newOrders = newOrder;
    });
    builder.addCase(fetchNewOrders.rejected, state => {
      state.fetchOrderLoading = false;
    });
    builder.addCase(deleteOrderData.pending, state => {
      state.deleteOrderLoading = true;
    });
    builder.addCase(deleteOrderData.fulfilled, (state, {meta}) => {
      state.deleteOrderLoading = meta.arg;
    });
    builder.addCase(deleteOrderData.rejected, state => {
      state.deleteOrderLoading = false;
    });
  },
});

export const orderReducer = orderSlice.reducer;
export const { addDish, updateOrder, clearOrder, toggleModal, deleteOrder } = orderSlice.actions;
export const selectOrderDishes = (state: RootState) => state.order.orderDishes;
export const selectNewOrders = (state: RootState) => state.order.newOrders;
export const selectModalShow = (state: RootState) => state.order.modalShow;
export const selectCreateOrderLoading = (state: RootState) => state.order.createOrderLoading;
export const selectFetchOrderLoading = (state: RootState) => state.order.fetchOrderLoading;
export const selectDeleteOrderLoading = (state: RootState) => state.order.deleteOrderLoading;