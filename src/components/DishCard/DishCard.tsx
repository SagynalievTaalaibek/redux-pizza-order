import React from 'react';
import { Dish } from '../../types';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeleteDishLoading } from '../../store/dishes/dishesSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { deleteDish, fetchDishes } from '../../store/dishes/dishesThunks';

interface Props {
  dish: Dish;
}

const DishCard: React.FC<Props> = ({ dish }) => {
  const deleteDishLoading = useAppSelector(selectDeleteDishLoading);
  const dispatch = useAppDispatch();

  const onDelete = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };


  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between ">
        <div className="d-flex">
          <img style={{ width: '200px', minHeight: '160px' }} src={dish.image} alt={dish.title} />
          <h4 className="d-flex align-items-center ms-4">{dish.title}</h4>
        </div>
        <h4 className="d-flex align-items-center ms-4">Price: {dish.price}</h4>
        <div className="d-flex justify-content-center align-items-center ms-4">
          <Link
            className="btn btn-primary ms-2"
            to={'/admin/edit-dish/' + dish.id}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger ms-2"
            onClick={() => onDelete(dish.id)}
            disabled={deleteDishLoading ? deleteDishLoading === dish.id : false}
          >
            {deleteDishLoading && deleteDishLoading === dish.id && (<ButtonSpinner />)}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;