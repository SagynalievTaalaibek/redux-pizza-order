import React from 'react';
import { DELIVERY } from '../../constants/constants';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import { useAppSelector } from '../../app/hooks';
import { selectDeleteOrderLoading } from '../../store/order/orderSlice';
import { NewOrder } from '../../types';

interface Props {
  orders: NewOrder;
  onDelete: React.MouseEventHandler;
}

const OrderCard: React.FC<Props> = ({ orders, onDelete }) => {
  const deleteOrderLoading = useAppSelector(selectDeleteOrderLoading);

  return (
    <div className="col-4">
      <div className="card mb-2 h-100">
        <div className="card-body">
          <p>Customer: <strong>{orders.customer.name}</strong></p>
          <p>Address: <strong>{orders.customer.address}</strong></p>
          <p>Phone: <strong>{orders.customer.phone}</strong></p>
          <ul>
            {orders.order.map((orderData, index) => (
              <li key={index}>
                {orderData.amount} x {orderData.dish.title} - {parseFloat(orderData.dish.price) * orderData.amount} KGS
              </li>
            ))}
            <li>Delivery: {DELIVERY}</li>
          </ul>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <h6 className="mt-2">Total sum: {orders.order.reduce((sum, order) => {
            return sum + parseFloat(order.dish.price) * order.amount;
          }, DELIVERY)}</h6>
          <button
            className="btn btn-danger"
            onClick={onDelete}
            disabled={deleteOrderLoading ? deleteOrderLoading === orders.id : false}
          >
            {deleteOrderLoading && deleteOrderLoading === orders.id && (<ButtonSpinner />)}
            Complete order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;