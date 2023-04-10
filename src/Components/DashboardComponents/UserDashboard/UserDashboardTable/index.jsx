import React, {useState, useRef, useEffect} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ProjectModal from '../../../ProjectComponents/ProjectModal';
import IconButton from '@mui/material/IconButton';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DockIcon from '@mui/icons-material/Dock';
import Tooltip from '@mui/material/Tooltip';
import Papa from 'papaparse';
import {PDFDownloadLink} from "@react-pdf/renderer";

import SummaryPdfDownload from './Components/Template/SummaryPdf';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const UserDashboardTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dashboardData, setDashboardData] = useState(null);
    const [rendereSummary_link, setRendereSummary_link] = useState(false);

    const [trackDeviceData, setTrackDeviceData] = useState({
      'notStartedTracks': 0,
      'startedTracks': 0,
      'endedTracks': 0,
      'devices': 0
    });
    
    const [summaryPdfData, setSummaryPdfData] = useState(null);

    const btnSummaryPDFAuto = useRef(null);

    const [projectName, setProjectName] = useState(null);
    const [projectId, setProjectId] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    let isSummayButtonClicked = false;

    useEffect(()=>{
      const accessToken = localStorage.getItem('access_token');
      const FetchData = async() => {
        const response = await fetch('https://tracktest.ultra-x.jp/backend/users/showAllProjectsDetailsOfFollowingUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const dashData = await response.json();
        setDashboardData(dashData?.body);
      }
      FetchData()
    },[])

    const handleOpenDialog = async (id) => {
      console.log('==========handleOpenDialog starts==========');
      setProjectId(id);
      console.log(projectId);
      await GetTrackDeviceDataById(id);
      setOpenDialog(true);
      console.log('==========handleOpenDialog ends==========');
    };
  
    const handleCloseDialog = () => {
      console.log('==========handleCloseDialog starts==========');
      setOpenDialog(false);
      console.log('==========handleCloseDialog ends==========');
    };

  /* Create Track Id List In CSV Starts */

  const handleCSV = async (projectName, projectId) => {
    console.log('==========handleCSV starts==========');

    // Make a GET request to the API
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
      method: 'POST',
      body: JSON.stringify({
        project_id : projectId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if(!response) {return}
    const data = await response.json();
    console.log('==========handleCSV data==========', data);
    if(projectId !== null || projectId !== "" || typeof projectId !== "undefined") {
      // Convert the data into an array of objects
      const rows = data?.body?.map(item => {
        return {
          TrackID: item.device_tag.substring(item.device_tag.indexOf(".") + 1),
          DeviceVendor: item.vendor,
          DeviceModel: item.model,
          DeviceSerial: item.serial,
          Memo: item.state
        };
      });
      // Convert the array of objects into a CSV string
      const csv = Papa.unparse(rows);
      // Create a URL that points to the CSV string
      const url = window.URL.createObjectURL(new Blob([csv]));
      // Create a link that allows the user to download the CSV file
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName}_TRACKID_LIST_${Date.now()}.csv`;
      link.click();
  } else {return}

  console.log('==========handleCSV ends==========');
  }
  
  /* Create Track Id List In CSV Ends */

  /*create summary download starts*/

  const handleSummaryPdfDownload = async (projectName, projectId) => {
    console.log('__handleSummaryPdfDownload starts');

    setProjectName(projectName);
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
      method: 'POST',
      body: JSON.stringify({
        project_id : projectId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if(!response) {return}

    const _pdfData = await response.json();
    console.log('__handleSummaryPdfDownload data',_pdfData);
    setSummaryPdfData(_pdfData?.body);

    setRendereSummary_link((prevvalue) => {
      setTimeout(() => {
        if(!isSummayButtonClicked) {
          console.log('Auto click worked', {
            btnProperty: btnSummaryPDFAuto.current
          });
          btnSummaryPDFAuto.current.click();
          isSummayButtonClicked = !isSummayButtonClicked;
          setTimeout(() => {
            setRendereSummary_link((prevvalue) => {
              if(prevvalue) {
                isSummayButtonClicked = false;
                return false;
              }
            });
          }, 3000);
        }
      }, 3000)
      return true;
    });
    console.log('__handleSummaryPdfDownload ends');
  }
  
  /*create summary download ends*/
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const GetTrackDeviceDataById = async (id) => {
        const accessToken = localStorage.getItem('access_token');
        const FetchData = async() => {
          const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showProjectsTrackDetailsCount', {
              method: 'POST',
              body: JSON.stringify({
                project_id : id
              }),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
          });
          const detailData = await response.json();
          console.log("__detailData", detailData);
          setTrackDeviceData(detailData.body);
          console.log("__trackDeviceData", trackDeviceData);
        }
        FetchData();
    }
  
  return (
    <React.Fragment>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div>
        <ProjectModal/>
      </div>
       <TableContainer  sx={{ maxHeight: 345 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Details</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Project Name</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Created At</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">CSV</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">QRCode</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">QRTag</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">QRMobile</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Project Summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {dashboardData?.projects?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '& > *': { borderBottom: 'unset' } }}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <Dialog 
                fullScreen={false} 
                onClose={handleCloseDialog} 
                open={openDialog}
                BackdropProps={{ style: { backgroundColor: "transparent" } }}>
                    <DialogTitle>Detail Information</DialogTitle>
                    <Table>
                      <TableHead>
                        <TableRow align='center' style={{ background: "#009688"}}>
                          <TableCell align='center' style={{fontWeight: 'bold'}}>Number of Tracking ID</TableCell>
                          <TableCell align='center' style={{fontWeight: 'bold'}}>Number Tracked</TableCell>
                          <TableCell align='center' style={{fontWeight: 'bold'}}>Tracked Count</TableCell>
                          <TableCell align="center" style={{fontWeight: 'bold'}}>Number of Device</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align='center'>{trackDeviceData.notStartedTracks === "" ? "null": trackDeviceData.notStartedTracks}</TableCell>
                          <TableCell align="center">{trackDeviceData.startedTracks === "" ? "null": trackDeviceData.startedTracks}</TableCell>
                          <TableCell align="center">{trackDeviceData.endedTracks === "" ? "null": trackDeviceData.endedTracks}</TableCell>
                          <TableCell align="center">{trackDeviceData.devices === "" ? "null": trackDeviceData.devices}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <DialogActions>
                      <Button autoFocus onClick={handleCloseDialog}>
                        Close
                      </Button>
                    </DialogActions>
                </Dialog>
              <TableCell>
                <Tooltip title="Track & Device Information">
                  <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={async () => handleOpenDialog(row._id)}>
                  <PanToolAltIcon />
                  </IconButton>
                </Tooltip>

              </TableCell>
              <TableCell style={{display: 'none'}}>{row._id}</TableCell>
              <TableCell component="th" scope="row" align="center">{row.name_en}</TableCell>
              <TableCell align="center">{row.createdAt}</TableCell>
              <TableCell align="center">
                <Button
                    value={row._id}
                    onClick={() => {handleCSV(row.name_en, row._id)}}>
                      <ListAltIcon />
                </Button>
              </TableCell>

              <TableCell>
              <Button
                    value={row.id}
                    onClick={() => {alert("Still On Development Process")}}>
                      <PictureAsPdfIcon />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                    value={row.id}
                    onClick={() => {alert("Still On Development Process")}}>
                      <QrCodeScannerIcon />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                    value={row.id}
                    onClick={() => {alert("Still On Development Process")}}>
                      <DockIcon />
                </Button>
              </TableCell>
<TableCell align="center">

   <Stack justifyContent="center" spacing={2} direction="row">
      <Button
      variant="contained"
      onClick={() => {
        handleSummaryPdfDownload(row.name_en, row._id)
      }}
      >
        Download
      </Button>
        {
            rendereSummary_link &&
              <PDFDownloadLink
                document={<SummaryPdfDownload summaryPdfData={summaryPdfData} projectName={`${projectName}`}/>}
                fileName={`${projectName}_PROJECT_SUMMARY_${Date.now()}.pdf`}>
                {
                  <Button ref={btnSummaryPDFAuto}></Button>
                }
              </PDFDownloadLink>
        }
    </Stack>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        // count={dashboardData.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </React.Fragment>
  )
}

export default UserDashboardTable