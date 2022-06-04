import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/Actions/ProductActions';
import { PRODUCT_CREATE_RESET } from '../../redux/Constants/ProductConstants';
import './newProduct.css';

export default function NewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      setToast('product added');
      dispatch({ type: PRODUCT_CREATE_RESET });
      setCountInStock(0);
      setDescription('');
      setImage('');
      setName('');
      setPrice(0);
    }
  }, [product, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, price, description, image, countInStock));
    console.log('success');
  };
  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      {error && <h4>{error}</h4>}
      {loading && <h4>loading</h4>}
      {toast && <h4>{toast}</h4>}
      <form className='addProductForm' onSubmit={handleSubmit}>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            type='text'
            placeholder='Image address'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <p>OR</p>
          <input type='file' id='file' />
        </div>
        <div className='addProductItem'>
          <label>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Type here'
          />
        </div>
        <div className='addProductItem'>
          <label>Count In Stock</label>
          <input
            type='number'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            placeholder='Type here'
          />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Type here'
          />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <textarea
            rows='5'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Type here'
          />
        </div>
        <button type='submit' className='addProductButton'>
          Create
        </button>
      </form>
    </div>
  );
}
