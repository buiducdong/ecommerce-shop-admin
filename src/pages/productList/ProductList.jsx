import './productList.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProduct } from '../../redux/Actions/ProductActions';

export default function ProductList() {
  const productListt = useSelector((state) => state.productList);
  const { products, error, loading } = productListt;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
      dispatch(listProduct());
    }
  };

  return (
    <div className='productPage'>
      <div className='header'>
        <h2>Products</h2>
        <Link className='newProductBtn' to={`/newproduct`}>
          Create New
        </Link>
      </div>
      <div className='search'>
        <input type='text' placeholder='Search ...' />
      </div>
      {loading && <h2>loading ...</h2>}
      <div className='productList'>
        {products?.map((product, index) => (
          <div className='product'>
            <div className='info'>
              <img src={product.image} alt='imagee' />
              <p>{product.name}</p>
              <strong>${product.price}</strong>
            </div>
            <div className='action'>
              <Link to={`/product/${product._id}`} className='action-btn edit'>
                Edit
              </Link>
              <span
                onClick={() => handleDelete(product._id)}
                className='action-btn delete'
              >
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
