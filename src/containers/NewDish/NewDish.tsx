import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateDishLoading } from '../../store/dishes/dishesSlice';
import { createDish } from '../../store/dishes/dishesThunks';
import DishForm from '../../components/DIshForm/DishForm';
import { ApiDish } from '../../types';

const NewDish = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createDishLoading = useAppSelector(selectCreateDishLoading);

  const onCreateDish = async (dish: ApiDish) => {
    await dispatch(createDish(dish));
    navigate('/admin/dishes');
  };

  return (
    <>
      <h4>New Dish</h4>
      <div className="row-cols-1 row-cols-lg-2">
        <div className="col">
          <DishForm
            onSubmit={onCreateDish}
            isLoading={createDishLoading}
          />
        </div>
      </div>
    </>
  );
};

export default NewDish;