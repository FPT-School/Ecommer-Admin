import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function BarChart() {
    const chart = {
          
        series: [{
          name: 'Doanh Thu',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'Doanh Thu Các Tháng',
          data: [11, 32, 45, 32, 34, 52, 41]
        }, {
          name: 'click',
          data: [111, 42, 15, 82, 54, 12, 51]
        }, {
          name: 'Sản Phẩm Bán Chạy',
          data: [100, 72, 45, 87, 64, 42, 61]
        }],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },
      
      
      };
      const chartBar = {
        
          
          series: [{
            name: 'Đồ Nam',
            data: [44, 55, 41, 67, 22, 43, 21, 49]
          }, {
            name: 'Đồ Nữ',
            data: [13, 23, 20, 8, 13, 27, 33, 12]
          }, {
            name: 'Đồ Trẻ Em',
            data: [11, 17, 15, 15, 21, 14, 15, 13]
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            xaxis: {
              categories: ['2020 Q1', '2020 Q2', '2020 Q3', '2020 Q4', '2021 Q1', '2021 Q2',
                '2021 Q3', '2021 Q4'
              ],
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'bottom',
              offsetX: 50,
              offsetY: 0
            },
          },
        
      
        }
    return (
        <div id="chart">
        <ReactApexChart options={chart.options}
         series={chart.series} 
         type='area'
         height={500}/>
         
        <ReactApexChart 
        options={chartBar.options} 
        series={chartBar.series} 
        type="bar" height={350} />
      </div>
      
    )
}
