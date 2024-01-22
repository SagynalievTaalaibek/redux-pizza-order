import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchOrderLoading, selectNewOrders } from '../../store/order/orderSlice';
import { deleteOrderData, fetchNewOrders } from '../../store/order/orderThunks';
import { fetchDishes } from '../../store/dishes/dishesThunks';
import { selectDishes } from '../../store/dishes/dishesSlice';
import OrderCard from '../../components/OrderCard/OrderCard';
import Spinner from '../../components/Spinner/Spinner';
import { NewOrder, OrderDish } from '../../types';

const Orders = () => {
  const newOrders = useAppSelector(selectNewOrders);
  const dishes = useAppSelector(selectDishes);
  const dispatch = useAppDispatch();
  const fetchOrderLoading = useAppSelector(selectFetchOrderLoading);


  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchNewOrders());
  }, [dispatch]);

  const ordersData: NewOrder[] = [];

  newOrders.forEach((item) => {
    const data: OrderDish[] = [];

    Object.keys(item.order).forEach((orderDishId) => {
      const amount = item.order[orderDishId];

      const dish = dishes.find((dish) => dish.id === orderDishId);

      if (dish) {
        data.push({ dish, amount });
      }
    });

    ordersData.push({
      order: data,
      customer: item.customer,
      id: item.id,
    });
  });

  const onOrderDelete = async (id: string) => {
    await dispatch(deleteOrderData(id));
    await dispatch(fetchNewOrders());
  };

  return (
    <div className="row">
      {fetchOrderLoading ? <Spinner /> : ordersData.map((item) => (
        <OrderCard
          orders={item}
          key={item.id}
          onDelete={() => onOrderDelete(item.id)}
        />
      ))}
    </div>
  );
};

export default Orders;