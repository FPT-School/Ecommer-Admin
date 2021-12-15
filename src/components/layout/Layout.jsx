import React, { Component } from 'react'
import './Layout.css'

import  Sidebar  from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import  Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom'

export class Layout extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route render={(props)=>(
                    <div className='layout'>
                        <Sidebar {...props}/>
                        <div className="layout__content">
                            <TopNav/>
                            <div className="layout__content-main">
                                <Routes/>
                            </div>
                        </div>
                    </div>
                )}/>
            </BrowserRouter>
        )
    }
}

export default Layout
