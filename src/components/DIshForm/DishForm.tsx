import React, { useState } from 'react';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { ApiDish } from '../../types';

const initialState: ApiDish = {
  title: '',
  price: '',
  image: '',
};

interface Props {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: ApiDish;
  isLoading: boolean;
}


const DishForm: React.FC<Props> = ({ existingDish = initialState, onSubmit, isLoading }) => {
  const [dish, setDish] = useState<ApiDish>(existingDish);

  const changeDish = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDish((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(dish);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="form-control"
          value={dish.title}
          onChange={changeDish}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          required
          className="form-control"
          value={dish.price}
          onChange={changeDish}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          required
          className="form-control"
          value={dish.image}
          onChange={changeDish}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
        {isLoading && <ButtonSpinner />}
        Save
      </button>
    </form>
  );
};

export default DishForm;