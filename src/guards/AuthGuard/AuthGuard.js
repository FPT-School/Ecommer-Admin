import { JODY, PATH_NAME } from 'config';
import React from 'react';
import { isEmpty } from 'lodash';
import { Redirect, Route } from 'react-router-dom';

const AuthGuard = (props) => {
  const isAuth = JSON.parse(localStorage.getItem(JODY) || '{}');
  if (isEmpty(isAuth)) return <Redirect to={PATH_NAME.LOGIN} />;
  return <Route {...props} />;
};

export default AuthGuard;
