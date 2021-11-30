import React from 'react';
import Customer from '../components/customers/Customer';
import { useState, useEffect } from 'react';

const Customers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((user) => setUsers(user));
  }, []);

  return (
    <div>
      <h2 className="page-header">customers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <tr className='table' style={{height:'50px'}}>
                <th>ID</th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Gmail</th>
                <th>Hành động khác</th>
              </tr>

              {users.map((user) => (
                <Customer key={user.id} data={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
