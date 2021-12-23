import { unwrapResult } from '@reduxjs/toolkit';
import { getAnalysisOrders } from 'features/analyticSlice';
import { useGetOrderList } from 'hooks/useGetOrder';
import { useGetUser } from 'hooks/useGetUser';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import StatusCard from '../components/status-card/StatusCard';

const Dashboard = () => {
  const [countOrderSuccess, setCountOrderSuccess ] = useState(0);
  const { total: _totalUser } = useGetUser();
  const { total: _totalOrder } = useGetOrderList();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const orderSuccess = await dispatch(getAnalysisOrders({ status: 1 }));
      const { totalResults } = unwrapResult(orderSuccess);
      setCountOrderSuccess(totalResults || 0);
    })();
  }, [dispatch]);

  const data = [
    {
      icon: 'bx bx-user',
      count: _totalUser,
      title: 'Số lượng người dùng',
    },
    {
      icon: 'bx bx-cart',
      count: countOrderSuccess,
      title: 'Đơn hàng thành công',
    },
    {
      icon: 'bx bx-dollar-circle',
      count: '2,632,000',
      title: 'Tổng thu nhập',
    },
    {
      icon: 'bx bx-receipt',
      count: _totalOrder,
      title: 'Tổng Orders',
    },
  ];
  return (
    <div>
      <h2 className="page-header">Tổng quan </h2>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {data.map((item, index) => (
              <div className="col-6" key={index}>
                {item.title}
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
