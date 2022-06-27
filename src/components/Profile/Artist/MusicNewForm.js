import * as Yup from 'yup';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Input, Select } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../hook-form';
import { createCollection } from '../../../redux/actions/collections';
// firebase
import storage from '../../../firebase';
// import BlogNewPostPreview from './BlogNewPostPreview';
import { createMusic } from '../../../redux/actions/musics';
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

export default function MusicNewForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewCollectionSchema = Yup.object().shape({
    creator: Yup.string().required('Creator is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    // content: Yup.string().min(1000).required('Content is required'),
    // cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    desc: '',
    img: '',
    video: '',
  };

  const [musicData, setMusicData] = useState({
    title: '',
    desc: '',
    img: '',
    video: '',
  });

  const [uploaded, setUploaded] = useState(0);

  const methods = useForm({
    resolver: yupResolver(), // add NewCollectionSchema in params to activate error handling
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
      dispatch(createMusic(musicData));
      enqueueSnackbar('Music created successfully!');
      navigate(PATH_DASHBOARD.artist.add_music);
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

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/musics/${fileName}`).put(item.file);
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
            setMusicData((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: musicData.img, label: 'img' },
      { file: musicData.video, label: 'video' },
    ]);
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
                  label="Music Title"
                  value={musicData.title}
                  onChange={(e) => setMusicData({ ...musicData, title: e.target.value })}
                />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={musicData.desc}
                  onChange={(e) => setMusicData({ ...musicData, desc: e.target.value })}
                />

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <div>
                      <LabelStyle>Image</LabelStyle>
                      <Input
                        name="img"
                        type="file"
                        multiple={false}
                        onChange={(e) => setMusicData({ ...musicData, img: e.target.files[0] })}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div>
                      <LabelStyle>Video</LabelStyle>
                      <Input
                        name="video"
                        type="file"
                        multiple={false}
                        onChange={(e) => setMusicData({ ...musicData, video: e.target.files[0] })}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
            {uploaded === 2 ? (
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button disabled fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                  Upload
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleUpload}>
                  Upload
                </Button>
                <LoadingButton disabled fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Submit
                </LoadingButton>
              </Stack>
            )}
          </Grid>

          {/* <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Publish"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                />

                <RHFTextField name="metaTitle" label="Meta title" />

                <RHFTextField name="metaDescription" label="Meta description" fullWidth multiline rows={3} />

                <Controller
                  name="metaKeywords"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Meta keywords" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>
          </Grid> */}
        </Grid>
      </FormProvider>

      {/* <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
}
