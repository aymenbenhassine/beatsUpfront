import * as Yup from 'yup';
import { useCallback, useState ,useEffect} from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete,Input } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../hook-form';
import { createModule } from '../../../redux/actions/E-LearningActions/modules';
import storage from '../../../firebase';


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

export default function ModuleNewForm() {
  const dispatched = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [uploaded, setUploaded] = useState(0);


  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  useEffect(() => {
    ModuleData.course = JSON.parse(localStorage.getItem('addedCourse'))._id ;
    setModuleData(ModuleData);
  }, []);

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

  const [ModuleData, setModuleData] = useState({
    title: '',
    description: '',
    content: '',
    videoURL: '',
    course: '',
  });
  console.log(ModuleData);

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
      ModuleData.course = JSON.parse(localStorage.getItem('addedCourse'))._id ;
      console.log(ModuleData);
      dispatched(createModule(ModuleData));
      enqueueSnackbar('Module added!');
      navigate(PATH_DASHBOARD.eLearning.addQuiz);
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
  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: ModuleData.videoURL, label: 'videoURL' }]);
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/modules/${fileName}`).put(item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setModuleData((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };



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
                  value={ModuleData.title}
                  onChange={(e) => setModuleData({ ...ModuleData, title: e.target.value })}
                />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={ModuleData.description}
                  onChange={(e) => setModuleData({ ...ModuleData, description: e.target.value })}
                />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFTextField
                    name="content"
                    value={ModuleData.content}
                    onChange={(e) => setModuleData({ ...ModuleData, content: e.target.value })}
                  />
                </div>

                <div>
                  <LabelStyle>Video</LabelStyle>
                  <RHFTextField
                    name="videoURL"
                    value={ModuleData.videoURL}
                    onChange={(e) => setModuleData({ ...ModuleData, videoURL: e.target.value })}
                  />
                </div>
                
                
                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                    

                    <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Submit & Add quiz
                </LoadingButton>
                  </Stack>
                
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
