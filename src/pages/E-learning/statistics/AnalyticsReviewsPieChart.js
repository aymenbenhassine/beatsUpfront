import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/chart';
import * as api from '../../../redux/api';


// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function AnalyticsReviewsPieChart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)

  const [ReviewsData,setReviewsData] = useState([4344, 5435, 1443, 4443,500]);

  useEffect(() => {
    dispatch(getReviewsStats(userId));
  }, []);

  const getReviewsStats = (userId) => async (dispatch) => {
    try {
      const {  data } = await api.fetchTotalReviewsStatistics(userId);
      setReviewsData(data);
      dispatch({ type: 'FETCH_BY_SEARCH' });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ReviewsData)
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.chart.red[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.primary.main,
      
    ],
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars','5 Stars'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <>
      <Card>
        <CardHeader title="Your Course's Reviews in Total" />
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="pie" series={ReviewsData} options={chartOptions} height={280} />
        </ChartWrapperStyle>
      </Card>
    </>
  );
}
