import * as Yup from 'yup';
import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// @mui
import { styled } from '@mui/material/styles';
import { Chip, Stack, TextField, Button, Autocomplete } from '@mui/material';
import ChipInput from 'material-ui-chip-input';

// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Image from '../../Image';
import Iconify from '../../Iconify';
import InputStyle from '../../InputStyle';
import SearchNotFound from '../../SearchNotFound';
import { getCollectionsBySearch } from '../../../redux/actions/collections';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// ----------------------------------------------------------------------

export default function CollectionSearch() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const searchCollection = () => {
    if (search.trim() || tags) {
      dispatch(getCollectionsBySearch({ search, tags: tags.join(',') }));
      navigate(`${PATH_DASHBOARD.musicWorld.search}?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate(PATH_DASHBOARD.musicWorld.explore);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchCollection();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <>
      <TextField
        onKeyDown={handleKeyPress}
        name="search"
        variant="outlined"
        label="Search Collection"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ChipInput
        style={{ margin: '10px 0' }}
        value={tags}
        onAdd={(chip) => handleAddChip(chip)}
        onDelete={(chip) => handleDeleteChip(chip)}
        label="Search Tags"
        variant="outlined"
      />
    </>
  );
}
