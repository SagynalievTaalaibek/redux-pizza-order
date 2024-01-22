import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDishes, selectFetchDishLoading } from '../../store/dishes/dishesSlice';
import Spinner from '../../components/Spinner/Spinner';
import { useEffect } from 'react';
import { fetchDishes } from '../../store/dishes/dishesThunks';
import DishCard from '../../components/DishCard/DishCard';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const fetchDishesLoading = useAppSelector(selectFetchDishLoading);
  const dishes = useAppSelector(selectDishes);


  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <h3>Dishes</h3>
        <Link to={'/admin/new-dish'} className="btn btn-primary">Add new Dish</Link>
      </div>
      <div>
        {fetchDishesLoading ? (<Spinner />) : dishes.map((dish) => (
          <DishCard dish={dish} key={dish.id} />
        ))}
      </div>
    </>
  );
};

export default Dishes;