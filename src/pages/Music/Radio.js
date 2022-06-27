import { useEffect, useState } from 'react';
// @mui
import { Container, MenuItem, TextField, Grid, Stack, CircularProgress } from '@mui/material';
// radioApi
import { RadioBrowserApi } from 'radio-browser-api';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import MusicPlayerSlider from '../../components/Radio/MediaControlCard';

// ----------------------------------------------------------------------

export default function Radio() {
  const { themeStretch } = useSettings();

  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState('all');

  const filters = ['all', 'classical', 'country', 'dance', 'disco', 'house', 'jazz', 'pop', 'rap', 'retro', 'rock'];

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');

    const stations = await api
      .searchStations({
        language: 'english',
        tag: stationFilter,
        limit: 30,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  return (
    <Page title="Radio">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Our Radio Stations"
          links={[{ name: 'Dashboard' }, { name: 'Music' }, { name: 'Radio' }]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <TextField defaultValue={filters[0]} select size="small">
            {filters.map((filter, index) => (
              <MenuItem
                key={index}
                value={filter}
                sx={{ mx: 1, my: 0.5, borderRadius: 1 }}
                onClick={() => setStationFilter(filter)}
              >
                {filter}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {!stations ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {stations &&
              stations.map((station, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={6}>
                    <MusicPlayerSlider station={station} />
                  </Grid>
                );
              })}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
