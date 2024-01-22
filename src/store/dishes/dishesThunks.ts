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

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (dishId) => {
    await axiosApi.delete(`/dishesPizza/${dishId}.json`);
  },
);


export const editDish = createAsyncThunk<void, {id: string, dish: ApiDish}>(
  'dishes/edit',
  async ({ id, dish }) => {
    await axiosApi.put(`/dishesPizza/${id}.json`, dish);
  },
);

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  'dishes/fetchOne',
  async (dishId) => {
    const responseDish = await axiosApi.get<ApiDish | null>(`/dishesPizza/${dishId}.json`);
    const dish = responseDish.data;

    if (dish === null) {
      throw new Error('Not found');
    }

    return dish;
  },
);