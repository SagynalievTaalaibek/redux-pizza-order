import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiDish } from '../../types';

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (dish) => {
    await axiosApi.post('dishesPizza.json', dish);
  },
);