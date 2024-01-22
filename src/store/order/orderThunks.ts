import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiNewOrder, ApiOrder, Order } from '../../types';

export const createOrder = createAsyncThunk<void, ApiOrder>(
  'order/create',
  async (newOrder) => {
    await axiosApi.post('/ordersPizza.json', newOrder);
  },
);

export const fetchNewOrders = createAsyncThunk<Order[], undefined>(
  'order/fetchAll',
  async () => {
    const ordersResponse = await axiosApi.get<ApiNewOrder | null>('/ordersPizza.json');
    const orders = ordersResponse.data;
    let newOrders: Order[] = [];

    if (orders) {
      newOrders = Object.keys(orders).map((id) => {
        const newOrder = orders[id];

        return {
          ...newOrder,
          id,
        };
      });
    }

    return newOrders;
  },
);

export const deleteOrderData = createAsyncThunk<void, string>(
  'order/delete',
  async (id) => {
    await axiosApi.delete(`/ordersPizza/${id}.json`);
  },
);