import { useDispatch } from 'react-redux';
import { useState } from 'react';

// @mui
import { Box, Container, Button, InputAdornment, Typography, Card, Grid, Stack } from '@mui/material';
import ReactPlayer from 'react-player';

import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import * as api from '../../redux/api';

import InputStyle from '../../components/InputStyle';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ScrapingCourses } from '../../redux/actions/E-LearningActions/courses';

// ----------------------------------------------------------------------

export default function Scrapingcourses() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const [scrappedData, setScrappedData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const handleScrapping = (input) => {
    console.log(input);
    dispatch(scrapData(input));
    /** {scrappedData.map((url)=> (
            <Typography key={url}> {url} </Typography>     
        ))} */
  };
  const scrapData = (query) => async (dispatch) => {
    try {
      const { data } = await api.scrapCourses(query);
      setScrappedData(data);
      console.log(data);

      console.log(scrappedData);
      dispatch({ type: 'FETCH_ALL_SCRAPING', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Scraping Courses"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'E-Learning', href: PATH_DASHBOARD.eLearning.listsArtist },
            { name: 'Scraping Courses' },
          ]}
        />
      </Container>
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Grid container spacing={3}>
          <InputStyle
            stretchStart={240}
            placeholder="Scrap courses..."
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Button variant="contained" onClick={(e) => handleScrapping(searchValue)}>
            Scrap Data
          </Button>
        </Grid>
      </Container>


      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Grid container spacing={3}>
          {scrappedData.map((videoUrl) => (

            <Grid item xs={12} md={6} lg={6}>
              <ReactPlayer url={videoUrl} controls="true" />
              <Typography key={videoUrl}> {videoUrl} </Typography>
            </Grid>
          ))}

        </Grid>
      </Container>


    </Page>
  );
}
