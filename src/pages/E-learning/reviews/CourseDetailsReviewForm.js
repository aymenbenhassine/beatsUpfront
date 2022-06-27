import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Stack, Rating, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

import { createReview } from '../../../redux/actions/E-LearningActions/reviews';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

CourseDetailsReviewForm.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.string,
};

export default function CourseDetailsReviewForm({ course, onClose, id, ...other }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();


  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)


  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Rating is required'),
    comment: Yup.string().required('Review is required')
  });
  const defaultValues = {
    rating: null,
    comment: '',
  };



  const [ReviewData, setReviewData] = useState({
    rating: null,
    comment: '',
    course: course._id,
    user: userId
  });

  const methods = useForm({
    resolver: yupResolver(), // ReviewSchema
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      console.log(ReviewData);
      dispatch(createReview(ReviewData));
      setReviewData({
        rating: null,
        comment: '',
        course: course._id,
        user: userId
      })
      enqueueSnackbar('Thanks for the review !');
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    onClose();
    reset();
  };

  return (
    <RootStyle {...other} id={id}>
      <Typography variant="subtitle1" gutterBottom>
        Add Review
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <div>
            <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
              <Typography variant="body2">Your review about this Course:</Typography>

              <Rating
                value={Number(ReviewData.rating)}
                onChange={(e) => setReviewData({ ...ReviewData, rating: e.target.value })}
              />
            </Stack>
            {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}
          </div>

          <RHFTextField value={ReviewData.comment}
            onChange={(e) => setReviewData({ ...ReviewData, comment: e.target.value })}
            name="comment"
            label="Review *"
            multiline
            rows={3}
          />


          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button color="inherit" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Post review
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}
