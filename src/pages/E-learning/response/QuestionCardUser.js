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

import { createAnswer } from '../../../redux/actions/E-LearningActions/answer';

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



export default function QuestionCardUser({ quiz }) {
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.googleId || user?.result?._id)
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [message, setMessage] = useState('');
  const [AnwersCount, setAnwersCount] = useState(0);
  const [answerData, setAnswerData] = useState({
    optionNumber: 0,
    isValid: false,
    user: userId,
    question: ""
  });

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

  const handleRadioButtonsChange = (id, value) => {
    responseData[id] = value;
    setResponseData(responseData)
    // console.log(responseData)
  }

  const saveAndCheckCorrectAnswers = () => {
    console.log("correct answers..")
    let correctAnwersCount = 0;
    for (let i = 0; i < questions.length; i += 1) {
      if (responseData[questions[i]._id]) {
        answerData.question = questions[i]._id;
        answerData.isValid = false;
        answerData.optionNumber= responseData[questions[i]._id];
        // don't forget to save answers in the daatabase
        if (responseData[questions[i]._id] - questions[i].correctAnswer === 0) {
          answerData.isValid= true ;
          console.log("adding operation")
          correctAnwersCount += 1;
        }
        setAnswerData(answerData)
        dispatch(createAnswer(answerData));
      }
    }
    enqueueSnackbar(`your answers are saved ! score: ${correctAnwersCount} / ${questions.length}`);
    setMessage("You Scored  ")
    setAnwersCount(correctAnwersCount)
    console.log(correctAnwersCount)


  }




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
                        name="radio-buttons-group"
                        onChange={(e) => handleRadioButtonsChange(quest._id, e.target.value)}
                      >
                        {/* defaultValue={quest.correctAnswer} */}
                        <FormControlLabel value="1" control={<Radio />} label={quest.option1} />
                        <FormControlLabel value="2" control={<Radio />} label={quest.option2} />
                        <FormControlLabel value="3" control={<Radio />} label={quest.option3} />
                        <FormControlLabel value="4" control={<Radio />} label={quest.option4} />
                      </RadioGroup>
                    </FormControl>
                  </div>


                </Card>


              </Grid>
            </Grid>
          </Container>
        ))}
        {message && (
          <Typography variant="h5">
            &nbsp;&nbsp;&nbsp;{message}{AnwersCount} correct answers out of {questions.length}
          </Typography>
        )}
        {message && (
          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="warning"
              disabled
              onClick={() => saveAndCheckCorrectAnswers()}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
              get Score
            </Button>
          </Stack>
        )}
        {!message && (
          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="warning"
              onClick={() => saveAndCheckCorrectAnswers()}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
              get Score
            </Button>
          </Stack>
        )}
      </Container>
    </FormProvider >
  );
}
