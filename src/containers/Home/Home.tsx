import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDishes } from '../../store/dishes/dishesSlice';
import DishCard from '../../components/DishCard/DishCard';
import React, { useEffect, useState } from 'react';
import { fetchDishes } from '../../store/dishes/dishesThunks';
import {
  clearOrder,
  deleteOrder,
  selectCreateOrderLoading,
  selectOrderDishes,
  toggleModal,
} from '../../store/order/orderSlice';
import Modal from '../../components/Modal/Modal';
import { DELIVERY } from '../../constants/constants';
import { Customer } from '../../types';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import { createOrder } from '../../store/order/orderThunks';


const Home = () => {
  const dishes = useAppSelector(selectDishes);
  const orders = useAppSelector(selectOrderDishes);
  const orderCreateLoading = useAppSelector(selectCreateOrderLoading);
  const dispatch = useAppDispatch();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);


  const totalPrice = orders.reduce((sum, order) => {
    return sum + parseFloat(order.dish.price) * order.amount;
  }, 0);

  const changeCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = orders.reduce((newOrder, order) => {
      return { ...newOrder, [order.dish.id]: order.amount };
    }, {});

    await dispatch(createOrder({ order: orderData, customer }));
    dispatch(toggleModal());
    dispatch(clearOrder());
    setCustomer({
      name: '',
      address: '',
      phone: '',
    });
  };


  return (
    <>
      <div>
        {dishes.map((dish) => (
          <DishCard dish={dish} key={dish.id} />
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <h5>Order total {totalPrice}</h5>
        <button className="btn btn-primary" onClick={() => dispatch(toggleModal())}>Checkout</button>
      </div>
      <Modal>
        <div className="modal-header d-flex justify-content-between">
          <h3>Your order</h3>
          <button className="btn btn-close" type="button" onClick={() => dispatch(toggleModal())}></button>
        </div>
        <div className="modal-body">
          {orders.map((order) => (
            <div className="d-flex justify-content-between" key={order.dish.id}>
              <h5>{order.dish.title} x{order.amount}</h5>
              <div className="d-flex justify-content-between">
                <p>{parseFloat(order.dish.price) * order.amount} KGS</p>
                <button className="btn btn-close" onClick={() => dispatch(deleteOrder(order.dish))}></button>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between">
            <h5>Delivery {DELIVERY} KGS</h5>
            <h5>Total {totalPrice + DELIVERY}</h5>
          </div>
          {orders.length > 0 ? (
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="form-control"
                  value={customer.name}
                  onChange={changeCustomer}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  className="form-control"
                  value={customer.address}
                  onChange={changeCustomer}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  required
                  className="form-control"
                  value={customer.phone}
                  onChange={changeCustomer}
                />
              </div>
              <button
                className="btn btn-primary mt-2 me-2"
                type="submit" disabled={orders.length <= 0}
              >
                {orderCreateLoading && <ButtonSpinner />}
                Order
              </button>
              <button className="btn btn-warning mt-2" type="button" onClick={() => dispatch(toggleModal())}>Close
              </button>
            </form>
          ) : ''}
        </div>
      </Modal>
    </>
  );
};

export default Home;