import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { getAnalysisByModal } from 'features/analyticSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Spin } from 'antd';

const month = {
  '': 'N/A',
  January: 'Tháng 1',
  February: 'Tháng 2',
  March: 'Tháng 3',
  April: 'Tháng 4',
  May: 'Tháng 5',
  June: 'Tháng 6',
  July: 'Tháng 7',
  August: 'Tháng 8',
  September: 'Tháng 9',
  October: 'Tháng 10',
  November: 'Tháng 11',
  December: 'Tháng 12',
};
export default function BarChart() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const action = await dispatch(getAnalysisByModal('order'));
        const { result } = unwrapResult(action);
        setData(
          result.map((elm) => ({
            name: month[elm.month],
            data: [elm.numberRecord],
          }))
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) return <Spin />;
  if (!data) return null;

  const chartBar = {
    series: data,
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: ['Năm 2021'],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'bottom',
        offsetX: 50,
        offsetY: 0,
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={chartBar.options}
        series={chartBar.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
