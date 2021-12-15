import React from 'react';
import { useHistory } from 'react-router-dom';
// import ThemeMenu from "../thememenu/ThemeMenu";
import user_image from '../../assets/images/logo.png';
import user_menu from '../../assets/JsonData/user_menus.json';
import Dropdown from '../dropdown/Dropdown';
import './topnav.css';

const curr_user = {
  display_name: 'YoDy',
  image: user_image,
};

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const Topnav = () => {
  const history = useHistory();
  const handleLogout = () => {
    Promise.resolve()
      .then(localStorage.clear())
      .then(() => {
        history.push('/signin');
      });
  };
  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => {
              return (
                <div
                  key={index}
                  className="notification-item"
                  onClick={handleLogout}>
                  <i className={item.icon}></i>
                  <span>{item.content}</span>
                </div>
              );
            }}
          />
        </div>
        <div className="topnav__right-item">
          <i className="bx bx-bell"></i>
        </div>
        <div className="topnav__right-item">{/* <ThemeMenu /> */}</div>
      </div>
    </div>
  );
};

export default Topnav;
