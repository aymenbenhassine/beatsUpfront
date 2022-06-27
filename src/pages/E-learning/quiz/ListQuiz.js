

import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// redux 
// @mui

import { useTheme } from '@mui/material/styles';

import {
    Card,
    MenuItem,
    IconButton,
    Table,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../_mock';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user/list';
import { getQuiz, deleteQuiz } from '../../../redux/actions/E-LearningActions/quiz';
import quiz from '../../../redux/reducers/quiz';
import QuizzMoreMenu from './QuizzMoreMenu';
import * as api from '../../../redux/api';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    /* { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false }, */
    { id: '' },
];

// ----------------------------------------------------------------------

export default function QuizList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = useTheme();
    const { themeStretch } = useSettings();

    // const [userList, setUserList] = useState(_userList);
    const [quizListNow, setQuizList] = useState([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // User and id user 
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = (user?.result?.googleId || user?.result?._id)

    useEffect(() => {
        fetchAllQuiz(userId)
    }, [])

    const fetchAllQuiz =  async (id) => {
        try {
            console.log("getting data")
            const { data } = await api.fetchQuizByIdUser(id);
            console.log(data)
            setQuizList(data)
        } catch (error) {
            console.log(error);
        }
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = quizListNow.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteUser = (quizId) => {
        const deleteQuiiz = quizListNow.filter((quiz) => quiz._id !== quizId);
        dispatch(deleteQuiz(quizId));
        setSelected([]);
        setQuizList(deleteQuiiz);
    };



    const handleDeleteMultiUser = (selected) => {
        const deleteQuizs = quizListNow.filter((quiz) => !selected.includes(quiz._id));
        selected.map((quizId) => dispatch(deleteQuiz(quizId)));
        setSelected([]);
        setQuizList(deleteQuizs);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quizListNow.length) : 0;

    const filteredQuiz = applySortFilter(quizListNow, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredQuiz.length && Boolean(filterName);

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
    return (
        <Page title="Quiz: List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Quiz List"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Quiz' },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.user.newUser}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New User
                        </Button>
                    }
                />

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        onDeleteUsers={() => handleDeleteMultiUser(selected)}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={quizListNow.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredQuiz.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quiz) => {
                                        const isItemSelected = selected.indexOf(quiz._id) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={quiz._id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onClick={() => handleClick(quiz._id)} />
                                                </TableCell>
                                                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {quiz.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{quiz.description}</TableCell>
                                                <TableCell align="right" >
                                                    <QuizzMoreMenu onDelete={() => handleDeleteUser(quiz._id)} onUpdate={() => { navigate(`/dashboard/e-learning/quiz/update/${quiz._id}`, { state: quiz }) }} userName={'jsdfs'} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={quizListNow.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(e, page) => setPage(page)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
