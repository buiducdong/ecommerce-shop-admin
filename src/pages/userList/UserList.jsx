import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUser } from '../../redux/Actions/AdminActions';

export default function UserList() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <div className='userList'>
      <div className='header'>
        <h2>Customer</h2>
        <button>Create New</button>
      </div>
      <div className='search'>
        <input type='text' placeholder='Search ...' />
      </div>
      <div className='users'>
        {users?.map((user, index) => (
          <div key={index} className='userItem'>
            <img className='avatar' src={user.avatar} alt='avatar' />
            <h4>{user.name}</h4>
            <Link to={`/users/${user._id}`}>{user.email}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
