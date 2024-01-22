import React from 'react';
import { Dish } from '../../types';

interface Props {
  dish: Dish;
}

const DishCard: React.FC<Props> = ({ dish }) => {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between ">
        <div className="d-flex">
          <img style={{ width: '200px' }} src={dish.image} alt={dish.title} />
          <h4 className="d-flex align-items-center ms-4">{dish.title}</h4>
        </div>
        <h4 className="d-flex align-items-center ms-4">Price: {dish.price}</h4>
        <div className="d-flex justify-content-center align-items-center ms-4">
          <button className="btn btn-primary ms-2">Edit</button>
          <button className="btn btn-danger ms-2">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;