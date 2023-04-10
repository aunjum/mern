import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import GlobalSearch from './GlobalSearch';
import CreateTrackModal from './CreateTrackModal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const tableColumns = [
  { label: ' ', id: 'TRACE_ID' },
  { label: '#', id: 'TRACE_ID_SERIAL' },
  { label: 'Tracking ID', id: 'OBJECT_TRACE_ID' },
  { label: 'Tracking ID Registration Date', id: 'REGISTRATION_DATETIME' },
  { label: 'Completion Date', id: 'COMPLITETION_DATETIME' },
  { label: 'Project Name', id: 'CUSTOMER_PROJECT_ID' },
  { label: 'Requirements Specifications', id: 'REQUEST_PROCESSING_ID' },
  { label: 'ADEC PDF', id: 'ADEC_PDF_URL' },
  { label: 'Worker Name', id: 'SYSTEM_USER_ID' },
  { label: 'Current Tracking Process', id: 'PROCESSING_STATUS_ID' },
  { label: 'Start Tracking Registration', id: 'start_tracking_registration' },
  { label: 'Tracking Information Registration', id: 'tracking_information_registration' },
  { label: 'Device ID', id: 'OBJECT_HARDWARE_ID' },
  { label: 'Maker', id: 'OBJECT_HARDWARE_VENDER' },
  { label: 'Model Number', id: 'OBJECT_HARDWARE_PRODUCT' },
  { label: 'Serial', id: 'OBJECT_HARDWARE_SERIAL' },
  { label: 'Device Information Registration', id: 'device_information_registration' },
  { label: 'Tracking Information Display', id: 'tracking_information_display' },
  { label: 'Tracking End Registration', id: 'tracking_end_registration' },

]

function createData(h1, h2, h3, h4, h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16) {
  return {
    h1, h2, h3, h4, h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16
  };
}

const rows = [
  createData(1, '14321446815038228160', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(2, '14321446815038228161', '2022-11-11 18:22:46', 'Incomplete', 'ETTMS-V3-TEST','Erase','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(3, '14321446815038228162', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(4, '14321446815038228163', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V3-TEST','Erase','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(5, '14321446815038228164', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(6, '14321446815038228165', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(7, '14321446815038228166', '2022-11-11 18:22:46', 'Incomplete', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(8, '14321446815038228167', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(9, '14321446815038228168', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
  createData(10, '14321446815038228169', '2022-11-11 18:22:46', 'Not started', 'ETTMS-V2-TEST','Destroy','rabby','Not started','1927540640514579136_1','rabby','0000002','000010102','Terminated'),
 
];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {tableColumns.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'left'}
            align='center'
            style={{ background: "#009688", fontWeight: 'bold' }}
            //padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const TrackBoardTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', align: 'right', alignItems: 'center', width: '100%'}}
        elevation={5}
      >
        {/* <GlobalSearch searchItem={searchItem} setSearchItem={setSearchItem} /> */}
         <GlobalSearch/>
         <CreateTrackModal/>
        {/* <CustomSearch token={props.token} /> */}
        
      </Paper>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader aria-label="sticky table"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.h1}
                      sx={{ '& > *': { borderBottom: 'unset' } }}
                      // selected={isItemSelected}
                    >
                      
                      <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            key={row.h1}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
                      {/* <TableCell  key={row.h1}>
          <IconButton
            aria-label="expand row"
            size="small"
            key={row.h1}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        //padding="none"
                        align='center'
                        onClick={() => setOpen(!open)}
                      >
                        {row.h1}
                      </TableCell>
                      <TableCell align="center">{row.h2}</TableCell>
                      <TableCell align="center">{row.h3}</TableCell>
                      <TableCell align="center">{row.h4}</TableCell>
                      <TableCell align="center">{row.h5}</TableCell>
                      <TableCell align="center">{row.h6}</TableCell>
                      <TableCell align="center">
                      <Button
                              style={{
                                color: 'white',
                                backgroundColor: 'green',
                                fontSize: '12px',
                                padding: '10px',
                                border: '2px',
                                borderRadius: '5px',
                                width: '100px',
                                wordWrap: 'break-word'

                              }}
                              onClick={(e) => {
                               console.log("click")
                              }}

                            >
                              Download
                            </Button>
                      </TableCell>
                      <TableCell align="center">{row.h7}</TableCell>
                      <TableCell align="center">{row.h8}</TableCell>
                      <TableCell align="center">
                      <Button
                              style={{
                                color: 'white',
                                backgroundColor: 'rgb(91, 4, 4)',
                                fontSize: '12px',
                                padding: '10px',
                                border: '2px',
                                borderRadius: '5px',
                                width: '250px',
                                wordWrap: 'break-word'

                              }}
                              onClick={(e) => {
                               console.log("click")
                              }}

                            >
                              Start Tracking Registration
                            </Button>
                      </TableCell>
                      <TableCell align="center">
                      <Button
                              style={{
                                color: 'white',
                                backgroundColor: 'rgb(9, 0, 129)',
                                fontSize: '12px',
                                padding: '10px',
                                border: '2px',
                                borderRadius: '5px',
                                width: '250px',
                                wordWrap: 'break-word'

                              }}
                              onClick={() => alert("start information registration")}
                            >
                              Start Information registration
                            </Button>
                      </TableCell>
                      <TableCell align="center">{row.h9}</TableCell>
                      <TableCell align="center">{row.h10}</TableCell>
                      <TableCell align="center">{row.h11}</TableCell>
                      <TableCell align="center">{row.h12}</TableCell>
                      <TableCell align="center">
                      <Button
                              style={{
                                color: 'white',
                                backgroundColor: 'rgb(91, 4, 4)',
                                fontSize: '12px',
                                padding: '10px',
                                border: '2px',
                                borderRadius: '5px',
                                width: '270px',
                                wordWrap: 'break-word'

                              }}
                              onClick={(e) => {
                               console.log("click")
                              }}

                            >
                              Device Information Registration
                            </Button>
                      </TableCell>
                      <TableCell align="center">
                      <Button

                  style={{
                         color: 'white',
                         backgroundColor: 'blue',
                         fontSize: '12px',
                         padding: '10px',
                         border: '2px',
                         borderRadius: '5px',
                         width: '150px',
                         wordWrap: 'break-word'

                        }}

                       >
                         Details View
                    </Button>
                      </TableCell>
                      <TableCell align="center">{row.h13}</TableCell>
                    </TableRow>
                    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Device ID
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Device ID</TableCell>
                    <TableCell align='center'>Maker</TableCell>
                    <TableCell align="center">Model</TableCell>
                    <TableCell align="center">Serial</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                    <TableRow key={5}>
                      <TableCell component="th" scope="row" align='center'>
                        1
                      </TableCell>
                      <TableCell align='center'>Rabby</TableCell>
                      <TableCell align="center">001</TableCell>
                      <TableCell align="center">
                        0001
                      </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell component="th" scope="row" align='center'>
                        2
                      </TableCell>
                      <TableCell align='center'>Rabby</TableCell>
                      <TableCell align="center">001</TableCell>
                      <TableCell align="center">
                        0001
                      </TableCell>
                    </TableRow>
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
    </>
  );
}
export default TrackBoardTable
