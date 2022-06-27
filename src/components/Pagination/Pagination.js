/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/lab';
import { Link } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

import { getCollectionsPaginate } from '../../redux/actions/collections';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.collections);
  const classes = useStyles();
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getCollectionsPaginate(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`${PATH_DASHBOARD.musicWorld.explore}?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
