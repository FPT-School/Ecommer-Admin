import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from 'pages/Dashboard'
import Customers from 'pages/Customers'
import BarChart from 'pages/BarChart'


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/Analytics' component={BarChart}/>
        </Switch>
    )
}

export default Routes
