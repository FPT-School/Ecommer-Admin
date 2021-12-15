import React from 'react';

import { Link } from 'react-router-dom';
import { useHistory, useRouteMatch } from 'react-router';

import './Sidebar.css';

import logo from '../../assets/images/logo1.png';

import sidebar_items from '../../assets/JsonData/sidebar_routes.json';

const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const match = useRouteMatch();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to='/'>
          <img src={logo} alt="company logo" />
        </Link>
        
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={item.route === match.url}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
