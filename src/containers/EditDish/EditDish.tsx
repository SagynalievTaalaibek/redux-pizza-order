import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DishForm from '../../components/DIshForm/DishForm';
import Spinner from '../../components/Spinner/Spinner';
import { editDish, fetchOneDish } from '../../store/dishes/dishesThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEditDishLoading, selectFetchOneDishLoading, selectOneDish } from '../../store/dishes/dishesSlice';
import { ApiDish } from '../../types';

const EditDish = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dish = useAppSelector(selectOneDish);
  const fetchLoading = useAppSelector(selectFetchOneDishLoading);
  const editDishLoading = useAppSelector(selectEditDishLoading);

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(editDish({ id, dish }));
    navigate('/admin/dishes');
  };

  const existingDish = dish ? {
    ...dish,
    price: dish.price.toString(),
  } : undefined;

  let formSection = <Spinner />;

  if (!fetchLoading) {
    if (dish) {
      formSection = (
        <DishForm
          onSubmit={onSubmit}
          existingDish={existingDish}
          isLoading={editDishLoading}
        />);
    } else {
      formSection = <h4>Not found</h4>;
    }
  }

  return (
    <div className="row-cols-1 row-cols-lg-2">
      <div className="col">
        {formSection}
      </div>
    </div>
  );
};

export default EditDish;