import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectModalShow, toggleModal } from '../../store/order/orderSlice';
import Backdrop from '../Backdrop/Backdrop';


const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const modalShow = useAppSelector(selectModalShow);
  const dispatch = useAppDispatch();

  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <Backdrop show={modalShow} onClick={() => dispatch(toggleModal())} />
      <div className="modal show" style={{ display: modalShow ? 'block' : 'none' }}
           onClick={() => dispatch(toggleModal())}>
        <div className="modal-dialog" onClick={onInnerClick}>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;