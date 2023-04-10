import React, {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './RecordTable.module.css';
import FetchAllRecordByDeviceApiHandler from '../../../TrackBoardApi/FetchAllRecordByDeviceApiHandler';



const columns = [
    { id: 'name', label: 'Name', minWidth: 170 ,align:'center'},
    { id: 'group', label: 'Group', minWidth: 100, align:'center' },
    {
      id: 'project',
      label: 'Project',
      minWidth: 170,
      align: 'center',

    },
    {
      id: 'info',
      label: 'Info',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'status',
      type: 'button',
      label: 'Status',
      minWidth: 170,
      align: 'center',
    },
  ];
  
  function createData(name, group, project, info,status) {
    const density = group / 12;
    return { name, group, project, info, status };
  }
  
  const rows = [
    createData('HP', 'HP Corporation', "hp@gmail.com", "Admin","Active"),
    createData('dell', 'Dell corpuration', "dell@gmail.com", "Admin","Inactive"),
    createData('Asus', 'Asus', "asus@gmail.com", "Admin","Active"),
    createData('HP', 'HP Corporation', "hp@gmail.com", "Admin","Active"),
    createData('dell', 'Dell corpuration', "dell@gmail.com", "Admin","Inactive"),
    createData('Asus', 'Asus', "asus@gmail.com", "Admin","Active"),
    createData('HP', 'HP Corporation', "hp@gmail.com", "Admin","Active"),
    createData('dell', 'Dell corpuration', "dell@gmail.com", "Admin","Inactive"),
    createData('Asus', 'Asus', "asus@gmail.com", "Admin","Active"),
    
   
   
  ];

  const getDatePlease = (D) =>{
    return new Date(D).toLocaleString();
  }
  

const RecordTable = (props) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dashboardData, setDashboardData] = useState([]);
    console.log(dashboardData);
    const baseURL = "https://trackdev3.ultra-x.jp/Backend/ettms-api-v2.1.0/";

    useEffect( ()=>{
      const FetchData = async() =>{
        const response =  await FetchAllRecordByDeviceApiHandler(props.id);
        console.log("record all data",response.body)
        setDashboardData(response.body);
        
      }
     FetchData()

    },[props.id])
  
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
      {/* <h1>{props.id}</h1> */}
       <TableContainer  sx={{ maxHeight: 445 }}>
      <Table  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow >
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">Create Date</TableCell>
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">Processing Type</TableCell>
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">User</TableCell>
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">Record Photo</TableCell>
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">Tool Used</TableCell>
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">Location</TableCell>
            <TableCell  style={{ background: "#009688", fontWeight:'bold'}} align="center">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardData && dashboardData.map((row) => (
            <TableRow
              key={row.initial}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {getDatePlease(row.record_date_time)}
              </TableCell>
              <TableCell align="center">{row.processing_type.title_en}</TableCell>
              <TableCell align="center">{row.recorded_by_user.first_name +" "+row.recorded_by_user.last_name}</TableCell>
              <TableCell align="center">
              {/* <img src='row.recorded_by_user' alt="Girl in a jacket" width="300" height="300"> */}
              <img src={baseURL+row.image_link} width="200" height="200" alt='devicepic'/>
                {/* {row.recorded_by_user} */}
                </TableCell>
              <TableCell align="center">{row.tool_used}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">{row.comment}</TableCell>
              
                
                {/* <TableCell align="center">
                    

   <Stack justifyContent="center" spacing={2} direction="row">
      <Button variant="contained" >Update</Button>
      <Button variant="outlined" color="error">
        Block
      </Button>
    </Stack>
                  </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dashboardData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}

export default RecordTable

