import * as React from 'react';
import { useState ,useEffect,useRef } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GlobalSearch from './GlobalSearch';
import CreateTrackModal from './CreateTrackModal';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeviceIdModal from './DeviceComponents/DeviceIdModal';
import RecordModal from './DeviceRecordComponents/RecordModal';
import FetchAllTrackApiHandler from './TrackBoardApi/FetchAllTrackApiHandler';
import { width } from '@mui/system';
import FetchAllDeviceDataByTrackIdApiHandler from './TrackBoardApi/FetchAllDeviceDataByTrackIdApiHandler';
import { useNavigate,Link,useLocation, Routes, Route, Navigate} from "react-router-dom";
import RecordTableView from './DeviceRecordComponents/RecordTableView';
import StartTrackRegistrationApiHandler from './TrackBoardApi/StartTrackRegistrationApiHandler';
import EndTrackRegistrationApiHandler from './TrackBoardApi/EndTrackRegistrationApiHandler';
import FetchAllRecordByDeviceApiHandler from './TrackBoardApi/FetchAllRecordByDeviceApiHandler';
import AdecPdfDownload from './AdecPdfDownload';
import {
  PDFDownloadLink
} from "@react-pdf/renderer";
import FetchSingleTrackDetailsApi from './AdecPdfDownload/AdecPdfApi/FetchSingleTrackDetailsApi';

const tableColumns = [
  { label: ' ', id: 'TRACE_ID' },
  // { label: '#', id: 'TRACE_ID_SERIAL' },
  { label: 'Tracking ID', id: 'OBJECT_TRACE_ID' },
  { label: 'Registration Date', id: 'REGISTRATION_DATETIME' },
  { label: 'Track Start Date', id: 'track_start_date' },
  { label: 'Completion Date', id: 'COMPLITETION_DATETIME' },
  { label: 'Project Name', id: 'CUSTOMER_PROJECT_ID' },
  { label: 'Requirements Specifications', id: 'REQUEST_PROCESSING_ID' },
  { label: 'ADEC PDF', id: 'ADEC_PDF_URL' },
  { label: 'Worker Name', id: 'SYSTEM_USER_ID' },
  { label: 'Current Tracking Process', id: 'PROCESSING_STATUS_ID' },
  { label: 'Tracking Registration', id: 'start_tracking_registration' },
  { label: 'Device Information Registration', id: 'device_information_registration' },
  // { label: 'Tracking Information Display', id: 'tracking_information_display' },
  // { label: 'Tracking End Registration', id: 'tracking_end_registration' },

]

function createData1(h1, h2, h3, h4, h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16) {
  return {
    h1, h2, h3, h4, h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16
  };
}

const rows1 = [
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

function createData(h1, h2, h3, h4, h5,h6,h7,h8,h9,h10,h11,h12,h13) {
  return {
    h1, h2, h3, h4, h5,h6,h7,h8,h9,h10,h11,h12,h13,
    history: [
      {
        date: '14321446815038228160_1',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '14321446815038228160_2',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageOpenEnd, setMessageOpenEnd] = useState(false);
  const [count, setCount] = useState(1);
  const [deviceData, setDeviceData] = useState([]);
  const [clickTrackId, setClickTrackId] = useState();
  const [controlMessage, setControlMessage] = useState(false);
  const [controlDevieceMessage, setControlDeviceMessage] = useState(false);
  const [initialDate, setInitialDate] = useState('1970-01-01T00:00:00.000Z')
  const [trackDataValue, setTrackDataValue] = useState(null);
  const [deviceDataValue, setDeviceDataValue] = useState(null);
  const [recordDataValue, setRecordDataValue] = useState(null);
  const [adecClickId, setAdecClickId] = useState(null);

  const [renderePDF_link, setRenderePDF_link] = useState(false);
  const btnDownloadPDFAuto = useRef(null);
  const navigate = useNavigate();

  console.log(initialDate)
  console.log(controlMessage)
  console.log(controlDevieceMessage);

  const MessagehandleClose = () => {
    setMessageOpen(false);
    setMessageOpenEnd(false)
  };

  const getDatePlease = (D) =>{
    return new Date(D).toLocaleString();
  }

  const HandleStartTrackRegistration = async() =>{
    const response = await StartTrackRegistrationApiHandler(clickTrackId)
    console.log("start tarck ",response)
      if(response.success === true)
      {
        if(response.body === null){
          console.log("body null")
         // setControlMessage(true)
          console.log(controlDevieceMessage);
         //setControlDeviceMessage(false)
        }else{
          console.log("value")
          setControlMessage(true)
          //setControlDeviceMessage(false)
        }

      //   if(response. === true)
      // {
       
      //   setControlDeviceMessage(true)
      //   console.log("inside success")
      // }
      }
      else{
        console.log("error")
         
      }
      

  }

  const HandleSEndTrackRegistration = async() =>{
    const response = await EndTrackRegistrationApiHandler(clickTrackId)
    console.log("End track ",response)
      if(response.success === true)
      {
        console.log("djhdhdhd")
      }
      else{
        console.log("error")
         
      }
      

  }

  const ClickTrackIdForMessageStart = (id) =>{
    setMessageOpen(true)
    setClickTrackId(id)
  }

  const ClickTrackIdForMessageEnd = (id) =>{
    setMessageOpenEnd(true)
    setClickTrackId(id)
  }


  let isButtonClicked = false;
  const handleAutoDownloadPDFCLIK = () => {
    if(!isButtonClicked) {
      console.log('Auto click worked', {
        btnProperty: btnDownloadPDFAuto.current
      });

      btnDownloadPDFAuto.current.click();
      isButtonClicked = !isButtonClicked;

      setTimeout(() => {
        setRenderePDF_link((prevvalue) => {
          if(prevvalue) {
            isButtonClicked = false;
            return false;
          }
        });
      }, 3000);
    }
  }

  const handleAdecPdf = async (e, id) => {
    // setRenderePDF_link((prevvalue) => {
    //   return false;
    // })
    //alert(`hello, ${OBJECT_TRACE_ID}`);
    console.log("hello", id);
    setAdecClickId(id);
   // const trackResult = await FetchAllTrackApiHandler(id);
    const trackResult = await FetchSingleTrackDetailsApi(id);
    const deviceResult = await FetchAllDeviceDataByTrackIdApiHandler(id);
    deviceResult.body.map(row => console.log("this is deviceid",row._id))
    const recordResult = await FetchAllRecordByDeviceApiHandler(deviceResult.body.map(row => row._id));
    console.log('haaaaaaaaaaaa', recordResult)
    //const recordResult = await FetchAllRecordByDeviceApiHandler('63b7aaf470e0cb42975b4c4c');
    console.log("new track result", trackResult);
    console.log("new device result", deviceResult);
    console.log("new record result", recordResult);
    // const trackResult = await trackingInformationApi(props.token, OBJECT_TRACE_ID);
    // const deviceResult = await deviceInformationApi(props.token, OBJECT_TRACE_ID);

    const _trackData = trackResult.body;
    const _deviceData = deviceResult.body;
    const _recordData = recordResult.body;
    console.log("adec pdf result", {
      adecPDF_resultFtromAPI: trackResult,
      _trackData
    });
    setTrackDataValue(_trackData); // useState call
    setDeviceDataValue(_deviceData);
    setRecordDataValue(_recordData);
    
     setRenderePDF_link((prevvalue) => {
      setTimeout(() => {
        handleAutoDownloadPDFCLIK();
      }, 3000)
      return true;
    });
  };

  const GetDeviceDataByTrackId = async(trackId) =>{
    const allData = await FetchAllDeviceDataByTrackIdApiHandler(trackId); 
    console.log(allData.body);
     if(allData.success === true)
     {
      setDeviceData(await allData.body);
      setOpen(!open)
      console.log("data aise ",allData.body)
         
     }
  }
  console.log("it's device", deviceData)

  return (
    <React.Fragment>
      <Dialog
        open={messageOpenEnd}
        onClose={MessagehandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are Ending Track Id  !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={MessagehandleClose}>Disagree</Button>
          {messageOpenEnd === true?
          // handleReport(hardwareHistoryId)
          <Button onClick={ HandleSEndTrackRegistration}>
            Agree
          </Button>
          : null}
        </DialogActions>
      </Dialog>

      {controlMessage === false ?
      <Dialog
        open={messageOpen}
        onClose={MessagehandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are Starting Track Id  !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={MessagehandleClose}>Disagree</Button>
          {messageOpen === true?
          // handleReport(hardwareHistoryId)
          <Button onClick={HandleStartTrackRegistration}>
            Agree
          </Button>
          : null}
        </DialogActions>
      </Dialog>
      :
      
    //   <Dialog
    //   open={messageOpen}
    //   onClose={MessagehandleClose}
    //   aria-labelledby="alert-dialog-title"
    //   aria-describedby="alert-dialog-description"
    //   fullWidth
    //   maxWidth="xs"
    // >
    //   <DialogTitle id="alert-dialog-title">
    //     {"Opps !!!"}
    //   </DialogTitle>
    //   <DialogContent>
    //     <DialogContentText id="alert-dialog-description">
    //       You need to device Registration first !!!!!
    //     </DialogContentText>
    //   </DialogContent>
    //   <DialogActions>
    //     <Button onClick={MessagehandleClose}>Close</Button>
    //   </DialogActions>
    // </Dialog>
    
      
      <Dialog
        open={messageOpen}
        onClose={MessagehandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          {"Congratulations !!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are successfully start Track Id
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={MessagehandleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      }
      
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
        <Tooltip title="Device Information">
          <IconButton
            aria-label="expand row"
            size="small"
            // onClick={() => setOpen(!open)}
            onClick={() => GetDeviceDataByTrackId(row._id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          </Tooltip>
        </TableCell>
        {/* <TableCell component="th" scope="row" align='center'>
          {row._id}
        </TableCell> */}
         <TableCell component="th" scope="row" align="center">{row.track_tag.tag_number}</TableCell>
        <TableCell align="center">{getDatePlease(row.track_registration_date)}</TableCell>
        <TableCell align="center">{getDatePlease(row.track_start_date)}</TableCell>
        <TableCell align="center">{row.track_end_date}</TableCell>
        <TableCell align="center">{row.project.name_en}</TableCell>
        <TableCell align="center">{row.request_type.title_en}</TableCell>
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
                                handleAdecPdf(e, row._id)
                              }}

                            >
                              Download
                            </Button>

                            {renderePDF_link &&
                            <PDFDownloadLink
                              document={
                                // <MyDocument eventName={props.eventName} noteData={data}/>
                                <AdecPdfDownload trackData={trackDataValue} deviceData={deviceDataValue} recordData={recordDataValue}/>
                                
                              }
                              fileName={`${adecClickId }_${Date.now()}.pdf`}

                            >
                              {({ blob, url, loading, error }) =>
                                loading ? "" : 
                                <Button ref={btnDownloadPDFAuto} onClick={handleAutoDownloadPDFCLIK}

                                >
                                  {/* Generated */}
                                </Button>

                              }
                            </PDFDownloadLink>
                          }
                      </TableCell>

                      <TableCell align="center">{row.created_by_user.first_name +" "+ row.created_by_user.last_name}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        {(row.track_start_date === initialDate) ? 
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
                                ClickTrackIdForMessageStart(row._id)
                              }}

                            >
                              Start Tracking Registration
                            </Button>
                            :
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
                              ClickTrackIdForMessageEnd(row._id)
                            }}

                          >
                            End Tracking Registration
                          </Button>
                            }
                      </TableCell>
                      {/* <TableCell align="center">
                     
                            <RecordModal id={row.h2}/>
                      </TableCell> */}
                      
                      <TableCell align="center">
                     
                            <DeviceIdModal id={row._id}/>
                      </TableCell>
                      {/* <TableCell align="center">
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
                      </TableCell> */}
                      {/* <TableCell align="center">{row.status}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={15}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Device Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow align='center' style={{ background: "#009688"}}>
                    <TableCell align='center' style={{fontWeight: 'bold'}}>Device ID</TableCell>
                    <TableCell align='center' style={{fontWeight: 'bold'}}>Device Name</TableCell>
                    <TableCell align='center' style={{fontWeight: 'bold'}}>Vendor</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Model</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Serial</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Specification</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>State</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Comment</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Track Record Registration</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>View Track Record</TableCell>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deviceData.map((deviceRow) => (
                    <TableRow key={deviceRow._id}>
                      <TableCell component="th" scope="row" align='center'>
                        {deviceRow.device_tag}
                      </TableCell>
                      <TableCell align='center'>{deviceRow.device_type.name_en}</TableCell>
                      <TableCell align="center">{deviceRow.vendor}</TableCell>
                      <TableCell align="center">{deviceRow.model}</TableCell>
                      <TableCell align="center">{deviceRow.serial}</TableCell>
                      <TableCell align="center">{deviceRow.spacifications === "" ? "null": deviceRow.spacifications}</TableCell>
                      <TableCell align="center">{deviceRow.state === "" ? "null" : deviceRow.state}</TableCell>
                      <TableCell align="center">{deviceRow.comment === "" ? "null": deviceRow.comment}</TableCell>
                      <TableCell align="center">
                     
                            <RecordModal id={deviceRow._id}/>
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
                                width: '250px',
                                wordWrap: 'break-word'

                              }}
                              onClick={
                                () => navigate("/viewTrackRecord", { state: { id : deviceRow._id } })
                               }
                            >
                              View Track Record
                          </Button>
                      </TableCell>
                      <TableCell align="center">
                    

   <Stack justifyContent="center" spacing={2} direction="row">
      <Button variant="contained" >Update</Button>
      <Button variant="outlined" color="error">
        Disable
      </Button>
    </Stack>
                  </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>

         </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function TrackBoardTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [trackBoardData, setTrackBoardData] = useState([]);
 

  console.log("track data", trackBoardData)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    useEffect( () =>{
      const FetchOrganizationData = async() =>{
        const allData = await FetchAllTrackApiHandler(); 
        console.log(allData.body);
         if(allData.success === true)
         {
          setTrackBoardData(await allData.body);
          console.log("data aise ")
             
         }
            
      }
      FetchOrganizationData();
    },[])


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
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table 
      aria-label="collapsible table"
      stickyHeader
      size={dense ? 'small' : 'medium'}
      sx={{ minWidth: 750 }}
      >
        {/* <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
         <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

        <TableBody>
          {trackBoardData.map((row) => (
            <Row key={row._id} row={row} />
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trackBoardData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
    </Box>
    </>
  );
}
