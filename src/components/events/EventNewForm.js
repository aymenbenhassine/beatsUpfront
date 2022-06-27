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
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../hook-form';
import { createEvents } from '../../redux/actions/events';
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

  const [EventData, setEventData] = useState({
    EventName: '',
    EventDes: '',
    EventDate: '',
    EventHost: [''],
    Eventphoto: '',
  });

  const [uploaded, setUploaded] = useState(0);

  const methods = useForm({
    resolver: yupResolver(), // add NewCollectionSchema in params to activate error handling
    EventData,
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
      dispatched(createEvents(EventData));
      enqueueSnackbar('Event success!');
      navigate(PATH_DASHBOARD.event.list);
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
      const uploadTask = storage.ref(`/events/${fileName}`).put(item.file);
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
            setEventData((prev) => {
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
      { file: EventData.Eventphoto, label: 'Eventphoto' },
    ]);
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setEventData({ ...EventData, [e.target.name]: value });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name="EventName"
                  label="event's Name"
                  value={EventData.EventName}
                  onChange={(e) => setEventData({ ...EventData, EventName: e.target.value })}
                />

                <RHFTextField
                  name="EventDate"
                  label="Date of the Event"
                  value={EventData.EventDate}
                  onChange={(e) => setEventData({ ...EventData, EventDate: e.target.value })}
                />

                <RHFTextField
                  name="EventDes"
                  label="Description of the event"
                  multiline
                  rows={3}
                  value={EventData.EventDes}
                  onChange={(e) => setEventData({ ...EventData, EventDes: e.target.value })}
                />

                <RHFTextField
                  name="EventHost"
                  label="The host of the Event"
                  value={EventData.EventHost}
                  onChange={(e) => setEventData({ ...EventData, EventHost: e.target.value })}
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
                        name="Eventphoto"
                        type="file"
                        multiple={false}
                        onDrop={handleDrop} 
                        onChange={(e) => setEventData({ ...EventData, Eventphoto: e.target.files[0] })}
                      />
                    </div>
                  </Grid>
              

                </Grid>
              </Stack>
            </Card>
            {uploaded === 1? (
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
