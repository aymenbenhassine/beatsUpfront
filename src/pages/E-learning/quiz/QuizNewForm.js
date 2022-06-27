import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { createQuiz } from '../../../redux/actions/E-LearningActions/quiz';
//

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

export default function QuizNewForm() {
  const dispatched = useDispatch();
  let addedQuiz = {};
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

 

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)

  const [QuizData, setQuizData] = useState({
    title: '',
    description: '',
    module: "62576274d04eeaa3f77da371",
    user: userId
  });

  const NewQuizSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });
  const defaultValues = {
    title: QuizData.title,
    description: QuizData.description,
  };
  const methods = useForm({
    resolver: yupResolver(),// NewQuizSchema
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();
  console.log(isValid)

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      console.log("here")
      QuizData.module = JSON.parse(localStorage.getItem('addedModule'))._id;
      await dispatched(createQuiz(QuizData));
      addedQuiz = await JSON.parse(localStorage.getItem('addedQuiz'));

      enqueueSnackbar('Quiz added!');
      navigate(PATH_DASHBOARD.eLearning.addQuestion);
    } catch (error) {
      console.error(error);
    }
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
                  label="Title"
                  value={QuizData.title}
                  onChange={(e) => setQuizData({ ...QuizData, title: e.target.value })}
                />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  value={QuizData.description}
                  onChange={(e) => setQuizData({ ...QuizData, description: e.target.value })}
                />
                <LoadingButton
                  fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}
                  state={{ quiz: addedQuiz }}
                >
                  Save & add questions
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>


    </>
  );
}
