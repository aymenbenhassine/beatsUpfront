import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/chart';
import * as api from '../../../redux/api';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function AnalyticsCoursesSubscriptionsRates() {
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)

  const [dataChart, setDataChart] = useState([{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }]);
  const [categorieSubs, setCategorieSubs] = useState([
    'Italy',
    'Japan',
    'China',
    'Canada',
    'France',
    'Germany',
    'South Korea',
    'Netherlands',
    'United States',
    'United Kingdom',
  ]);

  useEffect(() => {
    dispatch(getCoursesSubsStats(userId));
  }, []);

  const getCoursesSubsStats = (userId) => async (dispatch) => {
    try {
      const {  data } = await api.fetchCoursesSubsStatistics(userId);
      const dataArray = [];
      const categorieArray = [];
      for(let i=0;i< data.length ; i+=1){
        categorieArray.push(data[i].title)
        dataArray.push(data[i].subscribers)
      }
      console.log(dataArray);
      console.log(categorieArray)
      setCategorieSubs(categorieArray);
      setDataChart([{ data: dataArray }])
      dispatch({ type: 'FETCH_BY_SEARCH' });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataChart)
  console.log(categorieSubs)

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: categorieSubs,
    },
  });

  return (
    <Card>
      <CardHeader title="Subscription Rates" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={dataChart} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
