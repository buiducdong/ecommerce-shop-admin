import { Link, useParams } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { PartyMode, Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { editProduct, updateProduct } from '../../redux/Actions/ProductActions';
import { PRODUCT_UPDATE_RESET } from '../../redux/Constants/ProductConstants';

export default function Product() {
  const param = useParams();
  const productId = param.productId;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      setToast('Product Updated');
      dispatch(editProduct(productId));
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setImage(product.image);
        setName(product.name);
        setPrice(product.price);
      }
    }
  }, [successUpdate, dispatch, product, productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        countInStock,
        image,
        description,
      })
    );
  };

  return (
    <div className='productDetail'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart data={productData} dataKey='Sales' title='Sales Performance' />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.image} alt='imag' className='productInfoImg' />
            <span className='productName'>{product.name}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{product._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>sales:</span>
              <span className='productInfoValue'>2</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>in stock:</span>
              <span className='productInfoValue'>
                {product.countInStock > 0 ? 'yes' : 'no'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm' onSubmit={handleSubmit}>
          <div className='productFormLeft'>
            {errorUpdate && <h2>{errorUpdate}</h2>}
            {successUpdate && <h2>success updated</h2>}
            {toast && <h2>{toast}</h2>}
            <label>Product Name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <label>Price</label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Count In Stock</label>
            <input
              type='number'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <label>Description</label>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Image</label>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
            {/* <label>In Stock</label>
            <select name='inStock' id='idStock'>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
            <label>Active</label>
            <select name='active' id='active'>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select> */}
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={product.image} alt='' className='productUploadImg' />
              <label for='file'>
                <Publish />
              </label>
              <input type='file' id='file' style={{ display: 'none' }} />
            </div>
            <button type='submit' className='productButton'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
