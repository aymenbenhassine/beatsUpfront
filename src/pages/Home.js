// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeColorPresets,
  HomeAdvertisement,
  HomeHugePackElements,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="BeatsUp">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomeMinimal />

          <HomeHugePackElements />

          <HomeDarkMode />

          <HomeColorPresets />

          <HomeAdvertisement />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
