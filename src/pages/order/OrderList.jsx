import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './order.css';

export default function OrderList() {
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>All transactions</h3>
      <table className='widgetLgTable'>
        <tr className='widgetLgTr'>
          <th className='widgetLgTh'>Customer</th>
          <th className='widgetLgTh'>Email</th>
          <th className='widgetLgTh'>Paid</th>
          <th className='widgetLgTh'>Date</th>
          <th className='widgetLgTh'>Amount</th>
          <th className='widgetLgTh'>Status</th>
          <th className='widgetLgTh'>Action</th>
        </tr>
        {orders?.map((order, i) => (
          <tr key={i} className='widgetLgTr'>
            <td className='widgetLgUser'>
              {/* <img
              src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              alt=''
              className='widgetLgImg'
            /> */}
              <span className='widgetLgName'>{order.user.name}</span>
            </td>
            <td className='widgetLgDate'>{order.user.email}</td>
            <td
              className='widgetLgDate'
              style={{ color: `${order.paidAt ? 'green' : 'red'}` }}
            >
              {order.paidAt ? `paid at ${order.paidAt}` : 'not Paid'}
            </td>
            <td className='widgetLgDate'>{order.createdAt}</td>
            <td className='widgetLgAmount'>${order.totalPrice}</td>
            <td className='widgetLgStatus'>
              <Button type={order.isDelivered ? 'Approved' : 'Declined'} />
            </td>
            <td className='widgetLgAmount'>
              <Link className='link' to={`/order/${order._id}`}>
                Xem
              </Link>
            </td>
          </tr>
        ))}
        {/* <tr className='widgetLgTr'>
          <td className='widgetLgUser'>
            <img
              src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              alt=''
              className='widgetLgImg'
            />
            <span className='widgetLgName'>Susan Carol</span>
          </td>
          <td className='widgetLgDate'>user1@gmail.com</td>
          <td className='widgetLgDate'>paid at today 22:23 AM</td>
          <td className='widgetLgDate'>2 Jun 2021</td>
          <td className='widgetLgAmount'>$122.00</td>
          <td className='widgetLgStatus'>
            <Button type='Pending' />
          </td>

          <td className='widgetLgAmount'>Xem</td>
        </tr> */}
      </table>
    </div>
  );
}
