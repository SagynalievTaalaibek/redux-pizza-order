import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiOrder } from '../../types';
import axiosApi from '../../axiosApi';

export const createOrder = createAsyncThunk<void, ApiOrder>(
  'order/create',
  async (newOrder) => {
    await axiosApi.post('ordersPizza.json', newOrder);
  },
);

