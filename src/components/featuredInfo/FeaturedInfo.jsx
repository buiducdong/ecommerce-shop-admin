import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const totalSale = orders?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPrice;
  }, 0);
  const totalProducts = orders?.reduce((accumulator, currentValue) => {
    const qty = currentValue.orderItems.reduce((acc, curr) => {
      return acc + parseInt(curr.qty);
    }, 0);
    return accumulator + qty;
  }, 0);

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Sales</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>${totalSale}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Orders</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{orders?.length}</span>
          {/* <span className='featuredMoneyRate'>
            -1.4 <ArrowDownward className='featuredIcon negative' />
          </span> */}
        </div>
        {/* <span className='featuredSub'>Compared to last month</span> */}
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Products</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{totalProducts}</span>
          {/* <span className='featuredMoneyRate'>
            +2.4 <ArrowUpward className='featuredIcon' />
          </span> */}
        </div>
      </div>
    </div>
  );
}
