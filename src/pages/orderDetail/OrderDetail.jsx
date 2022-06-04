import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { deliveredOrder, getOrderDetails } from '../../redux/Actions/OrderActions';
import './orderDetail.css';
const OrderDetail = () => {
  const param = useParams();
  const orderId = param.orderId;
  window.scrollTo(0, 0);
  const history = useHistory();

  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const orderDetail = useSelector((state) => state.orderDetail);
  const { loading, order } = orderDetail;
  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } = orderDelivered;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  const handleDelivered = () => {
    dispatch(deliveredOrder(order));
  };
  return (
    <>
      <div className='containerr'>
        <div className='row  order-detail'>
          <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            <div className='row '>
              <div className='col-md-3 center'>
                <div className='alert-success order-box'>
                  <i class='fas fa-user'></i>
                </div>
              </div>
              <div className='col-md-8 center'>
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{adminInfo.name}</p>
                <p>{adminInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            <div className='row'>
              <div className='col-md-4 center'>
                <div className='alert-success order-box'>
                  <i className='fas fa-truck-moving'></i>
                </div>
              </div>
              <div className='col-md-8 center'>
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {order?.shippingAddress?.address}</p>
                <p>Pay method: {order?.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
            <div className='row'>
              <div className='col-md-4 center'>
                <div className='alert-success order-box'>
                  <i className='fas fa-map-marker-alt'></i>
                </div>
              </div>
              <div className='col-md-8 center'>
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {order?.shippingAddress?.address} -
                  {order?.shippingAddress?.city} - {order?.shippingAddress?.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* table order detail */}
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Product</th>
              <th scope='col'>Unit Price</th>
              <th scope='col'>Quality</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((orderItem, i) => (
              <tr key={i}>
                <th scope='row'>{i + 1}</th>
                <td>
                  <img className='image' src={orderItem.image} alt='imgf' />
                  <span>{orderItem.name}</span>
                </td>
                <td>${orderItem.price}</td>
                <td>{orderItem.qty}</td>
                <td>${orderItem.qty * orderItem.price}</td>
              </tr>
            ))}
            <tr>
              <th></th>
              <td></td>
              <td>Subtotal:</td>
              <td></td>
              <td style={{ fontWeight: 'bold' }}>${order?.itemsPrice}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
              <td>Sipping Cost:</td>
              <td></td>
              <td style={{ fontWeight: 'bold' }}>${order?.taxPrice}</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <th></th>
              <td></td>
              <td>Grand Total:</td>
              <td></td>
              <td>${order?.totalPrice}</td>
            </tr>
          </tbody>
        </table>
        {order?.isDelivered ? (
          <span style={{ padding: '6px 20px', backgroundColor: 'green' }}>
            DELIVERED at
          </span>
        ) : (
          <button onClick={handleDelivered}>MARK AS DELIVERED</button>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
