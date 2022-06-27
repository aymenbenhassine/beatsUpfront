import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paramCase } from 'change-case';


// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Iconify from '../../../components/Iconify';

import * as api from '../../../redux/api';

import { deleteQuestion } from '../../../redux/actions/E-LearningActions/question';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components*
import useSettings from '../../../hooks/useSettings';

/// Actions




import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------





const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------



export default function QuestionCardAdmin({ quiz }) {
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });



  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
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

  useEffect(async () => {
    fetchAllQuestionsByIdQuiz();
  }, []);

  // const questionet = useSelector((state) => state.questions);
  const fetchAllQuestionsByIdQuiz = async () => {
    try {
      const { data } = await api.fetchQuestionByIdQuiz(quiz._id);
      // QuestionList = data
      setQuestions(data)
      // console.log(QuestionList)
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteQuestion = (questionId) => {
    const deleteQuestions = questions.filter((question) => question._id !== questionId);
    dispatch(deleteQuestion(questionId));
    setQuestions(deleteQuestions)

  };



  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {questions.map((quest) => (
          <Container key={quest._id}>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            &nbsp;
            </Stack>
            <Grid container spacing={3}>
              <Grid item xs={12} spacing={3}>





                <Card sx={{ p: 3 }}>
                  <div>
                    <LabelStyle>Question</LabelStyle>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Question : {quest.question} </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={quest.correctAnswer}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="1" control={<Radio />} label={quest.option1} />
                        <FormControlLabel value="2" control={<Radio />} label={quest.option2} />
                        <FormControlLabel value="3" control={<Radio />} label={quest.option3} />
                        <FormControlLabel value="4" control={<Radio />} label={quest.option4} />
                      </RadioGroup>
                      Correct Answer : Option {quest.correctAnswer}
                    </FormControl>
                  </div>

                  <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      color="warning"
                      component={RouterLink}
                      to={`/dashboard/e-learning/question/update/${paramCase(quest._id)}`}
                      state={{ questionToUpdate: quest }}
                    >
                      {/** component={RouterLink} to={`${PATH_DASHBOARD.user.root}/${paramCase(userName)}/edit`} */}
                      <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      color="warning"
                      onClick={() => handleDeleteQuestion(quest._id)}
                    >
                      {/* onClick={onDelete} sx={{ color: 'error.main' }} */}
                      <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
                      Delete
                    </Button>
                  </Stack>
                </Card>


              </Grid>
            </Grid>
          </Container>
        ))}
      </Container>
    </FormProvider >
  );
}
