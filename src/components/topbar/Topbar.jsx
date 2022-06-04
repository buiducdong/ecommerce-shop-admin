import React, { useState } from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/Actions/AdminActions';

export default function Topbar() {
  const dispatch = useDispatch();

  const [exit, setExit] = useState(false);
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const history = useHistory();
  const handleExit = () => {
    dispatch(logout());
    history.push('/login');
  };
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <Link to={'/'} className='logo'>
            BRONZE-ADMIN
          </Link>
        </div>
        <div className='topRight'>
          <div className='topbarIconContainer'>
            <NotificationsNone />
            <span className='topIconBadge'>2</span>
          </div>
          <div className='topbarIconContainer'>
            <Language />
            <span className='topIconBadge'>2</span>
          </div>
          <div className='topbarIconContainer'>
            <Settings />
          </div>
          <div className='avatar'>
            <img
              onClick={() => setExit(!exit)}
              src='https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='topAvatar'
            />
            {exit && (
              <div className='exit' onClick={handleExit}>
                Exit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
