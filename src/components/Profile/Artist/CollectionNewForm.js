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
import { MusicContext } from '../../../contexts/musicContext/MusicContext';
import { getMusics } from '../../../contexts/musicContext/apiCalls';
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

export default function CollectionNewForm() {
  const navigate = useNavigate();
  const dispatched = useDispatch();

  const { musics, dispatch } = useContext(MusicContext);

  useEffect(() => {
    getMusics(dispatch);
  }, [dispatch]);

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
    creator: '',
    title: '',
    desc: '',
    content: [''],
    tags: [''],
    cover: '',
    trailer: '',
  };

  const [collectionData, setCollectionData] = useState({
    creator: '',
    title: '',
    desc: '',
    content: [''],
    tags: [''],
    cover: '',
    trailer: '',
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
      dispatched(createCollection(collectionData));
      enqueueSnackbar('Collection success!');
      navigate(PATH_DASHBOARD.musicWorld.explore);
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
      const uploadTask = storage.ref(`/collections/${fileName}`).put(item.file);
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
            setCollectionData((prev) => {
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
      { file: collectionData.cover, label: 'cover' },
      { file: collectionData.trailer, label: 'trailer' },
    ]);
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setCollectionData({ ...collectionData, [e.target.name]: value });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name="creator"
                  label="Creator's Name"
                  value={collectionData.creator}
                  onChange={(e) => setCollectionData({ ...collectionData, creator: e.target.value })}
                />

                <RHFTextField
                  name="title"
                  label="Collection Title"
                  value={collectionData.title}
                  onChange={(e) => setCollectionData({ ...collectionData, title: e.target.value })}
                />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={collectionData.desc}
                  onChange={(e) => setCollectionData({ ...collectionData, desc: e.target.value })}
                />

                <RHFTextField
                  name="tags"
                  label="Tags"
                  value={collectionData.tags}
                  onChange={(e) => setCollectionData({ ...collectionData, tags: e.target.value.split(',') })}
                />
                <Select name="content" label="Content" native multiple fullWidth onChange={handleSelect}>
                  {musics.map((music) => (
                    <option key={music._id} value={music._id}>
                      {music.title}
                    </option>
                  ))}
                </Select>

                {/* <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor name="content" />
                </div> 

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div> */}

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <div>
                      <LabelStyle>Cover</LabelStyle>
                      <Input
                        name="cover"
                        type="file"
                        multiple={false}
                        onChange={(e) => setCollectionData({ ...collectionData, cover: e.target.files[0] })}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                      <LabelStyle>Trailer</LabelStyle>
                      <Input
                        name="trailer"
                        type="file"
                        multiple={false}
                        onChange={(e) => setCollectionData({ ...collectionData, trailer: e.target.files[0] })}
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
