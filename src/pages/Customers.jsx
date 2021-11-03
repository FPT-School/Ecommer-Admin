import React from 'react'
import Customer from '../components/customers/Customer'
import {useState, useEffect} from 'react'


const Customers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res=>res.json())
            .then(user=>(
                setUsers(user)
            ))
    },[])

    return (
        <div>
            <h2 className="page-header">customers</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Gmail</th>
                                <th>Action</th>
                            </tr>
                            
                            {users.map(user =>(
                                <Customer
                                    key={user.id}
                                    data={user}
                                />
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
