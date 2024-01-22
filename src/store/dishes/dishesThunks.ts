import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiDish, ApiGetDish, Dish } from '../../types';

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (dish) => {
    await axiosApi.post('dishesPizza.json', dish);
  },
);

export const fetchDishes = createAsyncThunk<Dish[], undefined>(
  'dishes/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<ApiGetDish | null>('dishesPizza.json');
    const dishes = dishesResponse.data;

    let newDishes: Dish[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map(id => {
        const dish = dishes[id];
        return {
          ...dish,
          id,
        };
      });
    }

    return newDishes;
  },
);