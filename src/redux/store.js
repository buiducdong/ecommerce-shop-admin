import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminLoginReducer, userListReducer } from './Reducers/AdminReducer';
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from './Reducers/ProductReducer';
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from './Reducers/OrderReducer';

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailsReducer,
  orderDelivered: orderDeliveredReducer,
});
const middleware = [thunk];

const adminInfoFromLocalstorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;

const initialState = {
  adminLogin: {
    adminInfo: adminInfoFromLocalstorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
