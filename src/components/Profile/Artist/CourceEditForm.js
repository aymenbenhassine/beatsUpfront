import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';


// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../hook-form';
import { updateCourse } from '../../../redux/actions/E-LearningActions/courses';
//
// import BlogNewPostPreview from './BlogNewPostPreview';

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

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function CourceEditForm() {
  const dispatched = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

  const location = useLocation();
  const { courseToEdit } = location.state;

  const [CourseData, setCourceData] = useState({
    _id: courseToEdit._id,
    title: courseToEdit.title,
    description: courseToEdit.description,
    summary: courseToEdit.summary,
    imageUrl: courseToEdit.imageUrl,
  });

  const methods = useForm({
    resolver: yupResolver(),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      dispatched(updateCourse(CourseData._id,CourseData));

      enqueueSnackbar('Course UPDATED!');
      navigate(PATH_DASHBOARD.eLearning.listsArtist);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name="title"
                  label=" Title"
                  value={CourseData.title}
                  onChange={(e) => setCourceData({ ...CourseData, title: e.target.value })}
                />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={CourseData.description}
                  onChange={(e) => setCourceData({ ...CourseData, description: e.target.value })}
                />

                <div>
                  <LabelStyle>summary</LabelStyle>
                  <RHFTextField
                    name="summary"
                    value={CourseData.summary}
                    onChange={(e) => setCourceData({ ...CourseData, summary: e.target.value })}
                  />
                </div>

                <div>
                  <LabelStyle>Image</LabelStyle>
                  <RHFUploadSingleFile name="imageUrl" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>

      {/*
    <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> 
    */}
    </>
  );
}
