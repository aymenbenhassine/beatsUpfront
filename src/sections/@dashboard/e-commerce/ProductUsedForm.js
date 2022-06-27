import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Button, Input } from '@mui/material';
// redux
import { createProduit } from '../../../redux/actions/E-commerceActions/productActions';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
import storage from '../../../firebase';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function ProductNewForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClosePreview = () => {
    setOpen(false);
  };
  const [uploaded, setUploaded] = useState(0);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const defaultValues = {
    name: '',
    description: '',
    image: '',
    countInStock: '',
    price: 0,
    oldPrice: 0,
    category: '',
  };

  const [produitData, setProduitData] = useState({
    status: 'used',
    name: '',
    description: '',
    image: '',
    countInStock: 1,
    price: 0,
    oldPrice: 0,
    category: '',
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
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      dispatch(createProduit(produitData));
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(produitData);
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover', // images ??????????
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
      const uploadTask = storage.ref(`/produits/${fileName}`).put(item.file);
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
            setProduitData((prev) => {
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
      { file: produitData.image, label: 'image' },
    ]);
  };
  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setProduitData({ ...produitData, [e.target.name]: value });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField
                name="name"
                label="Product Name"
                value={produitData.name}
                onChange={(e) => setProduitData({ ...produitData, name: e.target.value })} />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={produitData.description}
                  onChange={(e) => setProduitData({ ...produitData, description: e.target.value })}
                />
              </div>
              <div>
                <RHFTextField
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  value={produitData.price}
                  onChange={(e) => setProduitData({ ...produitData, price: e.target.value })}
                />
              </div>

              <div>
                <LabelStyle>Image</LabelStyle>
                <Input
                  name="image"
                  type="file"
                  multiple={false}
                  onChange={(e) => setProduitData({ ...produitData, image: e.target.files[0] })}
                />
              </div>
            </Stack>
          </Card>
          {/* <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
              Submit
            </LoadingButton> */}
          {uploaded === 1 ? (
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
      </Grid>
    </FormProvider>
  );
}