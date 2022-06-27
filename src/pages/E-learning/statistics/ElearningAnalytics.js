import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// @mui
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
// sections
import AnalyticsReviewsPieChart from './AnalyticsReviewsPieChart';
import AnalyticsCoursesSubscriptionsRates from './AnalyticsCoursesSubscriptionsRates';
import ElearningWidgetSummary from './ElearningWidgetSummary';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../../assets';
import * as api from '../../../redux/api';


// ----------------------------------------------------------------------

export default function ElearningAnalytics() {
    const { themeStretch } = useSettings();
    const dispatch = useDispatch();
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalSubs, setTotalSubs] = useState(0);
    const [totalWishlists, setTotalWishlists] = useState(0);

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)

    useEffect(() => {
        dispatch(getTotalCourses(userId));
        dispatch(getTotalSubs(userId));
        dispatch(getTotalWishlists(userId));

    }, []);

    const getTotalCourses = (userId) => async (dispatch) => {
        try {
          const {  data } = await api.countCoursesByUser(userId);
          setTotalCourses(data);
          dispatch({ type: 'FETCH_BY_SEARCH' });
        } catch (error) {
          console.log(error);
        }
      };

    const getTotalSubs= (userId) => async (dispatch) => {
        try {
          const {  data } = await api.getTotalSubscriptionsByUser(userId);
          setTotalSubs(data);
          dispatch({ type: 'FETCH_BY_SEARCH' });
        } catch (error) {
          console.log(error);
        }
      };

    const getTotalWishlists = (userId) => async (dispatch) => {
        try {
          const {  data } = await api.getTotalWishlistByUser(userId);
          setTotalWishlists(data);
          dispatch({ type: 'FETCH_BY_SEARCH' });
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <Page title="Elearning: Analytics">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <ElearningWidgetSummary title="Total Courses" total={totalCourses} icon={<BookingIllustration />} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ElearningWidgetSummary title="Total Subscriptions" total={totalSubs} icon={<CheckInIllustration />} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <ElearningWidgetSummary title="Wishlists Total Existance" total={totalWishlists} icon={<CheckOutIllustration />} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <AnalyticsCoursesSubscriptionsRates />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AnalyticsReviewsPieChart />
                    </Grid>
                </Grid>
            </Container>

        </Page>
    );
}
