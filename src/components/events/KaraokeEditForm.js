import * as Yup from 'yup';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Input, Select } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../hook-form';
import { updateKaraokes } from '../../redux/actions/karaoke';
// firebase
import storage from '../../firebase';
// import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function CollectionNewForm() {
  const navigate = useNavigate();
  const dispatched = useDispatch();


  const location = useLocation();
  const { single } = location.state;
  console.log(single)

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

  const [KaraokeData, setKaraokeData] = useState({
    KaraokeName: single.KaraokeName,
    KaraokeHost: single.KaraokeHost,
    Karaokephoto: single.Karaokephoto,
    Karaokelyrics: single.Karaokelyrics,
    Karaokemp3: single.Karaokemp3,
  });

  const [uploaded, setUploaded] = useState(0);

  const methods = useForm({
    resolver: yupResolver(), // add NewCollectionSchema in params to activate error handling
    KaraokeData,
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
      dispatched(updateKaraokes(single._id, KaraokeData));
      enqueueSnackbar('Karaoke success!');
      navigate(PATH_DASHBOARD.Karaoke.posts);
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
      const uploadTask = storage.ref(`/Karaokes/${fileName}`).put(item.file);
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
            setKaraokeData((prev) => {
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
      { file: KaraokeData.Karaokephoto, label: 'Karaokephoto' },
      { file: KaraokeData.Karaokelyrics, label: 'Karaokelyrics' },
      { file: KaraokeData.Karaokemp3, label: 'Karaokemp3' },
    ]);
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setKaraokeData({ ...KaraokeData, [e.target.name]: value });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name="KaraokeName"
                  label="Karaoke's Name"
                  value={KaraokeData.KaraokeName}
                  onChange={(e) => setKaraokeData({ ...KaraokeData, KaraokeName: e.target.value })}
                />

                <RHFTextField
                  name="KaraokeHost"
                  label="Name of the signer"
                  value={KaraokeData.KaraokeHost}
                  onChange={(e) => setKaraokeData({ ...KaraokeData, KaraokeHost: e.target.value })}
                />
                

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
                        name="Karaokephoto"
                        type="file"
                        multiple={false}
                        onDrop={handleDrop} 
                        onChange={(e) => setKaraokeData({ ...KaraokeData, Karaokephoto: e.target.files[0] })}
                      />
                    </div>
                  </Grid>
                  <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <div>
                      <LabelStyle>Lyrics File</LabelStyle>
                      <Input
                        name="Karaokelyrics"
                        type="file"
                        multiple={false}
                        onDrop={handleDrop} 
                        onChange={(e) => setKaraokeData({ ...KaraokeData, Karaokelyrics: e.target.files[0] })}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <div>
                      <LabelStyle>Song File</LabelStyle>
                      <Input
                        name="Karaokemp3"
                        type="file"
                        multiple={false}
                        onDrop={handleDrop} 
                        onChange={(e) => setKaraokeData({ ...KaraokeData, Karaokemp3: e.target.files[0] })}
                      />
                    </div>
                  </Grid>
                </Grid>
                </Grid>
              </Stack>
            </Card>
            {uploaded === 3? (
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
