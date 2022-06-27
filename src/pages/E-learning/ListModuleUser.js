// @mui
import { Box, Link, Card, CardHeader, Typography, Stack } from '@mui/material';

import PropTypes from 'prop-types';
import { Link as RouterLink ,useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../redux/store';



// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
import { _ecommerceLatestProducts } from '../../_mock';
//
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import { ColorPreview } from '../../components/color-utils';
import { getModulesByIdCource } from '../../redux/actions/E-LearningActions/modules';
// ----------------------------------------------------------------------
ListModuleUser.propTypes = {
  course: PropTypes.object,
};
export default function ListModuleUser({course}) {
  const location = useLocation();
  const dispatch = useDispatch();

  // const { course } = location.state;
  console.log("chedd l course mte3ek")
  console.log(course)
  useEffect(() => {
    // getModules(dispatch);
   // getModulesByIdCource(dispatch,single._id);
    dispatch(getModulesByIdCource(course._id));
 }, [dispatch]);

 const modules = useSelector((state) => state.module);
  console.log(modules);

  return (
    <Card>
      <CardHeader title="Modules" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {modules.map((module) => (
            <CourseItem key={module._id} module={module} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

CourseItem.propTypes = {
  module :PropTypes.object,
};

function CourseItem({ module }) {

  return (
    <Stack direction="row" spacing={2}>

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link component={RouterLink} to="#" sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {module.title}
        </Link>

        <Stack direction="row">
          
          &nbsp;
          <Typography variant="body2" >
          &nbsp;
          </Typography>
        </Stack>
      </Box>

    </Stack>
  );
}
