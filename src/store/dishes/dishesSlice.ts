import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createDish, deleteDish, editDish, fetchDishes, fetchOneDish } from './dishesThunks';
import { ApiDish, Dish } from '../../types';

interface DishesState {
  dishes: Dish[];
  oneDish: ApiDish | null;
  fetchDishLoading: boolean;
  fetchOneDishLoading: boolean;
  createDishLoading: boolean;
  editDishLoading: boolean;
  deleteDishLoading: false | string;
}

const initialState: DishesState = {
  dishes: [],
  oneDish: null,
  fetchDishLoading: false,
  fetchOneDishLoading: false,
  createDishLoading: false,
  editDishLoading: false,
  deleteDishLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDish.pending, (state) => {
      state.createDishLoading = true;
    });
    builder.addCase(createDish.fulfilled, (state) => {
      state.createDishLoading = false;
    });
    builder.addCase(createDish.rejected, (state) => {
      state.createDishLoading = false;
    });
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchDishLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, { payload: dishes }) => {
      state.fetchDishLoading = false;
      state.dishes = dishes;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchDishLoading = false;
    });
    builder.addCase(deleteDish.pending, (state, { meta }) => {
      state.deleteDishLoading = meta.arg;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteDishLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteDishLoading = false;
    });
    builder.addCase(editDish.pending, (state) => {
      state.editDishLoading = true;
    });
    builder.addCase(editDish.fulfilled, (state) => {
      state.editDishLoading = false;
    });
    builder.addCase(editDish.rejected, (state) => {
      state.editDishLoading = false;
    });
    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneDishLoading = true;
    });
    builder.addCase(fetchOneDish.fulfilled, (state, { payload: dish }) => {
      state.fetchOneDishLoading = false;
      state.oneDish = dish;
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneDishLoading = false;
    });
  },
});


export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.dishes;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
export const selectFetchDishLoading = (state: RootState) => state.dishes.fetchDishLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteDishLoading;
export const selectCreateDishLoading = (state: RootState) => state.dishes.createDishLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneDishLoading;
export const selectEditDishLoading = (state: RootState) => state.dishes.editDishLoading;