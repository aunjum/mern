/* eslint-disable array-callback-return */
/* eslint-disable no-useless-concat */
import React, {useState, useEffect, useRef} from 'react'
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
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Papa from 'papaparse';
import QrCodePdfDownload from './QrCodePdf';
import {PDFDownloadLink} from "@react-pdf/renderer";
import SummaryPdfDownload from './SummaryPdf';
import MobileQrCodePdfDownload from '../../../../../Components/DashboardComponents/UserDashboard/UserDashboardTable/MobileQrCodePdf';
import QrTagPdfDownload from './QrTagpdf';
import QRCode  from 'qrcode';
import Dexie from 'dexie';

const UserDashboardTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dashboardData, setDashboardData] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [renderePDF_link, setRenderePDF_link] = useState(false);

    const [qRPdfData, setQrPdfData] = useState(null);
    const [qrTagPdfData, setQrTagPdfData] = useState(null);
    const [mobilePdfData, setMobilePdfData] = useState(null);
    const [summaryPdfData, setSummaryPdfData] = useState(null);

    const btnQrPDFAuto = useRef(null);
    const btnQrTagPDFAuto = useRef(null);
    const btnQrMobilePDFAuto = useRef(null);
    const btnSummaryPDFAuto = useRef(null);

    const [projectName, setProjectName] = useState(null);
    const [projectId, setProjectId] = useState(null);

    // Create a database
    const db = new Dexie('database');
    db.version(1).stores({
      data: '++id, tag, qrImage', // Primary key and indexed props
    });

    let isButtonClicked = false;
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setProjectName(event.target.value);
      console.log('click action ', event.target.value);
      setProjectId(event.target.getAttribute('data-id'));
      console.log('click action option  ', event.target.getAttribute('data-id'));
      setAnchorEl(event.currentTarget);
      console.log(anchorEl);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  /* Create Track Id List In CSV Starts */
  const handleCSV = async () => {
    // Make a GET request to the API
    const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
      method: 'POST',
      body: JSON.stringify({
        project_id : projectId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if(!response) {handleClose()}
    const data = await response.json();
    console.log(data);
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
      link.download = `${projectName}`+'_TRACKID_LIST.csv';
      link.click();
  } else {handleClose()}
  }
  /* Create Track Id List In CSV Ends */

  /* Create QR Code List In PDF Starts*/
  const convertToQRCode = async (tag) => {
    const _tag = tag;
    QRCode.toDataURL(_tag, {
      width: 100,
      margin: 2
    }, (err, _tag) => {
      if (err) return console.error(err);
      //console.log('_tag '+ tag, _tag);
      try {
        db.data.put({tag: tag, qrImage: JSON.stringify(_tag)});
      } catch (e) {
        console.log (`Error: ${e}`);
      }
      //localStorage.setItem(tag, JSON.stringify(_tag));
      //return _tag;
    })
  }

  const handleQrCode = async () => {
    console.log('_projectId ', projectId);
    if(projectId == null) {
      handleClose();
      return
    }
    const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
      method: 'POST',
      body: JSON.stringify({
        project_id : projectId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if(!response) {
      handleClose();
      return
    }
    const _qRData = await response.json();
    if(_qRData == null) {
      handleClose();
      return
    }
    console.log('_qRPdfData ', _qRData);

    // remember to set a state here

    let tag;
    // let dotIndex;
    // let track;
    // let device;
    _qRData?.body?.map(async item => {
      tag = item.device_tag;
      // dotIndex = tag.indexOf(".");
      // track = tag.substring(dotIndex + 1);
      // device = tag.substring(0, dotIndex);
      
      await convertToQRCode(tag);

      // base64String always returns undefined
      //use aync
      // store as array of objects. then destroy object after use
      // WHEN pdf creation is complete delete the items from localStorage
    });

    setRenderePDF_link((prevvalue) => {
      setTimeout(() => {
        if(!isButtonClicked) {
          console.log('Auto click worked', {
            btnProperty: btnQrPDFAuto.current
          });
          btnQrPDFAuto.current.click();
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
      }, 3000)
      return true;
    });
  }
  /* Create QR Code List In PDF Ends*/

  /* Create QR Code Tag List In PDF Starts*/
  const handleCreateQrTagPdf = async () => {
    const response = await fetch('http://localhost:3004/qrCode');
    const _pdfData = await response.json();
    setQrTagPdfData(_pdfData?.data);
    setRenderePDF_link((prevvalue) => {
      setTimeout(() => {
        if(!isButtonClicked) {
          console.log('Auto click worked', {
            btnProperty: btnQrTagPDFAuto.current
          });
          btnQrTagPDFAuto.current.click();
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
      }, 3000)
      return true;
    });
  }
  /* Create QR Code Tag List PDF Ends*/

  /* Create QR Code List For mobile  In PDF Starts*/
  const handleCreateTrackingQrMobilePdf = async () => {
    const response = await fetch('http://localhost:3004/qrCode');
    const _pdfData = await response.json();
    setMobilePdfData(_pdfData?.data);
    setRenderePDF_link((prevvalue) => {
      setTimeout(() => {
        if(!isButtonClicked) {
          console.log('Auto click worked', {
            btnProperty: btnQrMobilePDFAuto.current
          });
          btnQrMobilePDFAuto.current.click();
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
      }, 3000)
      return true;
    });
  }
  /* Create QR Code List For mobile In PDF Ends*/

  /*create summary download starts*/
  const handleSummaryPdfDownload = async (projectName, projectId) =>{
    console.log('__myPN', {projectName, date: new Date()})
    setProjectName(`${projectName}`);
    const response = await fetch('https://tracktest.ultra-x.jp/backend/tracks/showAllActiveDevicesOfFollowingProject', {
      method: 'POST',
      body: JSON.stringify({
        project_id : `${projectId}`
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if(!response) {return}
    const _pdfData = await response.json();
    setSummaryPdfData(_pdfData?.body);
    setRenderePDF_link((prevvalue) => {
      setTimeout(() => {
        if(!isButtonClicked) {
          console.log('Auto click worked', {
            btnProperty: btnSummaryPDFAuto.current
          });
          btnSummaryPDFAuto.current.click();
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
      }, 3000)
      return true;
    });
  }
  /*create summary download ends*/
    useEffect(()=>{
      const FetchData = async() => {
        const response = await fetch('http://localhost:3004/userDashboardTable');
        const dashData = await response.json();
        setDashboardData(dashData);
      }
      FetchData()
    },[])
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div>
      {/* <Button variant="contained">Create Organization</Button> */}
    
      <ProjectModal/>
      </div>
       <TableContainer  sx={{ maxHeight: 345 }}>
      <Table  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Project Name</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Created At</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Number of Tracking ID</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Number Tracked</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Tracked Count</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Number of Device</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Action</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Project Summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardData?.data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{display: 'none'}}>{row.id}</TableCell>
              <TableCell component="th" scope="row" align="center">{row.projectName}</TableCell>
              <TableCell align="center">{row.registrationDate}</TableCell>
              <TableCell align="center">{row.numberofTracking}</TableCell>
              <TableCell align="center">{row.numberTracked}</TableCell>
              <TableCell align="center">{row.trackedCount}</TableCell>
              <TableCell align="center">{row.numberofDevice}</TableCell>
              
                <TableCell align="center">
                <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        value={row.projectName}
        data-id={row.id}
      >
        Action
        <ArrowDropDownIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={{display:'block'}}>

        <Button
        value={row.id}
        variant="contained" 
        style={{margin:'10px',display:'block'}}
        onClick={handleCSV}
        >
          Creating Tracking ID List
        </Button>

        <Button variant="contained" style={{margin:'10px',display:'block'}} 
        onClick={
          handleQrCode
          }>
          Creating Tracking QR Code List
        </Button>
          {
            renderePDF_link &&
              <PDFDownloadLink
                document={<QrCodePdfDownload pdfData={qRPdfData}/>}
                fileName={`${projectName}`+`_MANAGE_QR_LIST.pdf`}>
                {
                  <Button ref={btnQrPDFAuto}></Button>
                }
              </PDFDownloadLink>
          }

        <Button 
        variant="contained" style={{margin:'10px',display:'block'}} 
        onClick={handleCreateQrTagPdf}>Creating Tracking QR Tag
        </Button>
        {
            renderePDF_link &&
              <PDFDownloadLink
                document={<QrTagPdfDownload qrTagPdfData={qrTagPdfData}/>}
                fileName={`${projectName}`+`_MANAGE_TAG_LIST.pdf`}>
                {
                  <Button ref={btnQrTagPDFAuto}></Button>
                }
              </PDFDownloadLink>
          }

        <Button 
        variant="contained" 
        style={{margin:'10px',display:'block'}} 
        onClick={handleCreateTrackingQrMobilePdf}>Creating Tracking QR List(For Mobile)
        </Button>
        {
            renderePDF_link &&
              <PDFDownloadLink
                document={<MobileQrCodePdfDownload mobilePdfData={mobilePdfData}/>}
                fileName={`${projectName}`+`_QR_MOBILE_LIST.pdf`}>
                {
                  <Button ref={btnQrMobilePDFAuto}></Button>
                }
              </PDFDownloadLink>
          }
        </div>
      </Menu>
    </div>
   
                  </TableCell>
                  <TableCell align="center">

   <Stack justifyContent="center" spacing={2} direction="row">
      <Button
      variant="contained"
      onClick={(e) => {
        handleSummaryPdfDownload(row.projectName, row.id)
      }}
      >
        Download
      </Button>
        {
            renderePDF_link &&
              <PDFDownloadLink
                document={<SummaryPdfDownload summaryPdfData={summaryPdfData} projectName={`${row.projectName}`}/>}
                fileName={`${projectName}_${Date.now()}.pdf`}>
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
    </>
  )
}

export default UserDashboardTable