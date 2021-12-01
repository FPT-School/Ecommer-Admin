import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'antd';

import './styles.scss';

const Orders = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((user) => setUsers(user));
  }, []);

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const dataSource = [
    {
      id: '1',
      username: 'Mike',
      total: 12000,
    },
  ];

  return (
    <div className="order">
      <h2 className="page-header">Đặt hàng</h2>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Orders;
