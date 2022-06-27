import * as Yup from 'yup';
import { useCallback, useState , useEffect} from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
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
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import { updateQuestion } from '../../../redux/actions/E-LearningActions/question';

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

export default function QuestionUpdateForm({question}) {
    const dispatch = useDispatch();
    /* const location = useLocation();
    const { quiz } = location.state ;
    console.log("quiz :")
    console.log(quiz) */
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleOpenPreview = () => {
        setOpen(true);
    };

    const handleClosePreview = () => {
        setOpen(false);
    };


    const [QuestionData, setQuestionData] = useState({
        _id:'',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '',
        quiz:'',
    });
    useEffect(() => {
        setQuestionData(question)
      }, []);
    
    const methods = useForm({
        resolver: yupResolver(),
        // defaultValues,
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
            dispatch(updateQuestion(QuestionData._id,QuestionData));
            enqueueSnackbar('Question added!');
            navigate(PATH_DASHBOARD.eLearning.addQuestionReload);
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
                                    name="question"
                                    label="Question"
                                    multiline
                                    rows={3}
                                    value={QuestionData.question}
                                    onChange={(e) => setQuestionData({ ...QuestionData, question: e.target.value })}
                                />
                                <RHFTextField
                                    name="firstOption"
                                    label="First Option"
                                    multiline
                                    rows={3}
                                    value={QuestionData.option1}
                                    onChange={(e) => setQuestionData({ ...QuestionData, option1: e.target.value })}
                                />
                                <RHFTextField
                                    name="secondOption"
                                    label="Second Option"
                                    multiline
                                    rows={3}
                                    value={QuestionData.option2}
                                    onChange={(e) => setQuestionData({ ...QuestionData, option2: e.target.value })}
                                />
                                <RHFTextField
                                    name="thirdOption"
                                    label="Third Option"
                                    multiline
                                    rows={3}
                                    value={QuestionData.option3}
                                    onChange={(e) => setQuestionData({ ...QuestionData, option3: e.target.value })}
                                />
                                <RHFTextField
                                    name="fourthOption"
                                    label="Fourth Option"
                                    multiline
                                    rows={3}
                                    value={QuestionData.option4}
                                    onChange={(e) => setQuestionData({ ...QuestionData, option4: e.target.value })}
                                />
                                <TextField
                                    name="correctAnswer"
                                    label="Correct Answer Number"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={QuestionData.correctAnswer}
                                    onChange={(e) => setQuestionData({ ...QuestionData, correctAnswer: e.target.value })}
                                
                                />
                                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                                    Update
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    );
}
