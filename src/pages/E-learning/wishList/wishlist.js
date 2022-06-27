

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';


// redux 
// @mui

import { useTheme } from '@mui/material/styles';

import {
    Card,
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
    Avatar,
    Link,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../_mock';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user/list';
import { deleteWishList } from '../../../redux/actions/E-LearningActions/wishList';
import * as api from '../../../redux/api';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'actions', label: 'Actions', alignRight: true },
    /* { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false }, */
    { id: '' },
];

// ----------------------------------------------------------------------

export default function WishList() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = (user?.result?.googleId || user?.result?._id)

    const theme = useTheme();
    const { themeStretch } = useSettings();

    // const [userList, setUserList] = useState(_userList);
    const [wishListNow, setWishList] = useState([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchWishList()
    }, [])

    const fetchWishList = async () => {
        try {
            const { data } = await api.fetchWishByIdUser(userId);
            console.log(data)
            setWishList(data)
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
            const newSelecteds = wishListNow.map((n) => n._id);
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

    const handleDeleteWish = (id) => {
        console.log("deleting")
        const deletedWishList = wishListNow.filter((wish) => wish._id !== id);
        dispatch(deleteWishList(id));
        setSelected([]);
        setWishList(deletedWishList);
    };



    const handleDeleteWishes = (selected) => {
        const deletedWishes = wishListNow.filter((wish) => !selected.includes(wish._id));
        selected.map((wishId) => dispatch(deleteWishList(wishId)));
        setSelected([]);
        setWishList(deletedWishes);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wishListNow.length) : 0;

    const filteredWishList = applySortFilter(wishListNow, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredWishList.length && Boolean(filterName);

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };

    return (
        <Page title="WishList">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="My WishList"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'WishList' },
                    ]}

                />

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName="Search.."
                        onFilterName={() => { console.log("not working") }}
                        onDeleteUsers={() => handleDeleteWishes(selected)}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={wishListNow.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredWishList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((wish) => {
                                        const isItemSelected = selected.indexOf(wish._id) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={wish._id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onClick={() => handleClick(wish._id)} />
                                                </TableCell>
                                                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar alt={wish?.course?.title} src={wish?.course?.imageUrl} sx={{ mr: 2 }} />
                                                    <Link
                                                        color="inherit"
                                                        to={`/dashboard/e-learning/coursedetails`}
                                                        component={RouterLink}
                                                        state={{ courseContent: wish.course }}
                                                    >
                                                        <Typography variant="subtitle2" noWrap>
                                                            {wish?.course?.title}
                                                        </Typography>
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">{wish?.course?.description}</TableCell>
                                                <TableCell align="left">

                                                    <Button
                                                        onClick={() => handleDeleteWish(wish._id)}
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={<Iconify icon={'eva:trash-2-outline'}
                                                        />}
                                                    >
                                                        Delete
                                                    </Button></TableCell>
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
                        count={wishListNow.length}
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
