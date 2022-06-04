import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { listProduct } from './redux/Actions/ProductActions';
import { listOrder } from './redux/Actions/OrderActions';
import OrderList from './pages/order/OrderList';
import OrderDetail from './pages/orderDetail/OrderDetail';

function App() {
  const admin = useSelector((state) => state.adminLogin);
  const { adminInfo } = admin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listProduct());
      dispatch(listOrder());
    }
  }, [dispatch, adminInfo]);
  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            {adminInfo ? <Home /> : <Login />}
          </Route>
          <Route path='/users'>{adminInfo ? <UserList /> : <Login />}</Route>
          <Route path='/user/:userId'>{adminInfo ? <User /> : <Login />}</Route>
          <Route path='/newUser'>{adminInfo ? <NewUser /> : <Login />}</Route>
          <Route path='/products'>{adminInfo ? <ProductList /> : <Login />}</Route>
          <Route path='/product/:productId'>{adminInfo ? <Product /> : <Login />}</Route>
          <Route path='/newproduct'>{adminInfo ? <NewProduct /> : <Login />}</Route>
          <Route path='/orders'>{adminInfo ? <OrderList /> : <Login />}</Route>
          <Route path='/order/:orderId'>{adminInfo ? <OrderDetail /> : <Login />}</Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
