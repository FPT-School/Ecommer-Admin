import React from 'react';
import StatusCard from '../components/status-card/StatusCard';
import statusCards from '../assets/JsonData/status-card-data.json';
import Chart from 'react-apexcharts';
import { useGetUser } from 'hooks/useGetUser';
import { useGetOrder } from 'hooks/useGetOrder';

const chartOptions = {
  series: [
    {
      name: 'Online Customers',
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: 'Store Customers',
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
};

const Dashboard = () => {
  const { total: _totalUser } = useGetUser();
  const { total: _totalOrder } = useGetOrder();

  const data = [
    {
      icon: 'bx bx-user',
      count: _totalUser,
      title: 'Số lượng người dùng',
    },
    {
      icon: 'bx bx-cart',
      count: '2,001',
      title: 'Đơn hàng',
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
        <div className="col-6">
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
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
