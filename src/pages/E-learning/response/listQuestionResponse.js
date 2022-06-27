
import { useLocation } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import { Container, CircularProgress, Grid, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// utils
// routes
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ListQuestion from './listQuestion'

import * as api from '../../../redux/api';

// sections

// ----------------------------------------------------------------------




// ----------------------------------------------------------------------


export default function ListQuestionsResonse() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { module } = location.state;
  const { themeStretch } = useSettings();
  const [QuizData, setQuizData] = useState({});

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    dispatch(getQuizByIdModule(module._id))
  }, []);

  const getQuizByIdModule = (id) => async () => {
    try {
      const { data } = await api.fetchQuizByIdModule(id);
      await setQuizData(data[0]);
      console.log("quiz data are here ")
      dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <Page title="Quiz: Questions">
        <HeaderBreadcrumbs
          heading="Quiz : "
          links={[
            {},
          ]}
        />
        {QuizData._id && (
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <Typography variant="h2">
              {QuizData.title} &nbsp;
            </Typography>
            <Typography variant="h4">
              &nbsp;
            </Typography>
            <Typography variant="h5">
              {QuizData.description} &nbsp;
            </Typography>
            <Typography variant="h2">
              &nbsp;
            </Typography>
            <ListQuestion quiz={QuizData} />
          </Container>
        )}




    </Page>
  );
}
