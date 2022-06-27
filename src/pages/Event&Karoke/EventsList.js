// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, deleteEvents } from '../../redux/actions/events';
// utils
import { fDate } from '../../utils/formatTime';

// import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  EventMoreMenu,
  ProductListHead,
  ProductListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Eventphoto', label: 'Image', alignRight: false },
  { id: 'EventName', label: 'Event Name', alignRight: false },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: 'EventHost', label: 'Event s Host', alignRight: false },
  { id: '', label: 'Edit&Delete'},
];

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [EventsList, setEventsList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    getEvents(dispatch);
  }, [dispatch]);
  const Events = useSelector((state) => state.Events);
  console.log(Events);

  useEffect(() => {
    if (Events.length) {
      setEventsList(Events);
    }
  }, [Events]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = EventsList.map((n) => n._id);
      setSelected(selected);
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
  };

  const handleDeleteProduct = (EventsId) => {
    const deleteProduiit = EventsList.filter((Events) => Events._id !== EventsId);
    dispatch(deleteEvents(EventsId));
    setSelected([]);
    setEventsList(deleteProduiit);
  };

  const handleDeleteProducts = (selected) => {
    const deleteEvents = EventsList.filter((Events) => !selected.includes(Events._id));
    selected.map((EventsId) => dispatch(deleteEvents(EventsId)));
    setSelected([]);
    setEventsList(deleteEvents);
    // window.location.reload();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EventsList.length) : 0;
  const filteredEvents = applySortFilter(EventsList, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredEvents.length && Boolean(filterName);

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Product List' },
          ]}
        />

        <Card>
          <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteProducts={() => handleDeleteProducts(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Events.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Events) => {
                    const isItemSelected = selected.indexOf(Events._id) !== -1;
                    return (
                      <TableRow
                        hover
                        key={Events._id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(Events._id)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Image
                            disabledEffect
                            alt={Events.EventName}
                            src={Events.Eventphoto}
                            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                          />
                          <Typography variant="subtitle2" noWrap>
                            {Events.name}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(Events.createdAt)}</TableCell>
                        <TableCell align="center">{(Events.EventName)}</TableCell>
                        <TableCell align="center">{(Events.EventHost)}</TableCell>
                        <TableCell align="right">
                          <EventMoreMenu
                            productName={Events.EventName}
                            id={Events._id}
                            onDelete={() => handleDeleteProduct(Events._id)}
                            Event={Events}
                          />
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
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
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
            count={EventsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
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
    return array.filter((_product) => _product.EventName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}