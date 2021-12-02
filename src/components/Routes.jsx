import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from 'pages/Dashboard'
import Customers from 'pages/Customers'
import BarChart from 'pages/BarChart'
import Categories from 'pages/Categories'

// import ProductList from 'components/List-Product'

import ProductList from 'pages/ProductList'
import Orders from 'pages/Orders'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/Analytics' component={BarChart}/>
            <Route path='/product-list' component={ProductList}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/categories' component={Categories}/>
        </Switch>
    )
}

export default Routes
