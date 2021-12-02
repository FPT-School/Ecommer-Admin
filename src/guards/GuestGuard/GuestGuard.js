import { JODY } from 'config'
import { PATH_NAME } from 'config'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const GuestGuard = (props) => {
 const isAuth = localStorage.getItem(JODY)
  if (isAuth) return <Redirect to={PATH_NAME.ROOT} />
  return <Route {...props} />
}

export default GuestGuard
