import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeleteDishLoading } from '../../store/dishes/dishesSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { deleteDish, fetchDishes } from '../../store/dishes/dishesThunks';
import { selectIsAdmin } from '../../store/admin/adminSlice';
import { addDish } from '../../store/order/orderSlice';
import { Dish } from '../../types';

interface Props {
  dish: Dish;
}

const DishCard: React.FC<Props> = ({ dish }) => {
  const deleteDishLoading = useAppSelector(selectDeleteDishLoading);
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);

  const onDelete = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };

  const onClick = () => {
    if (!isAdmin) {
      dispatch(addDish(dish));
    }
  };

  return (
    <div className="card mb-2" onClick={onClick}>
      <div className="card-body d-flex justify-content-between ">
        <div className="d-flex">
          <img style={{ width: '160px', minHeight: '150px' }} src={dish.image} alt={dish.title} />
          <h4 className="d-flex align-items-center ms-4">{dish.title}</h4>
        </div>
        <h4 className="d-flex align-items-center ms-4">Price: {dish.price}</h4>
        {isAdmin && (
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
        )}
      </div>
    </div>
  );
};

export default DishCard;