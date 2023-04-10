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
import styles from './SuperAdminDashboardTable.module.css';
import CreateOrganization from '../../../OrganizationComponents/CreateOrganization';
import OrganaizationModal from '../../../OrganizationComponents/OrganizationModal';
import FetchAllOrganizationApiHandler from '../../../OrganizationComponents/CreateOrganization/OrganizationApi/FetchAllOrganizationApiHandler';

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
  

const SuperAdminDashboardTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dashboardData, setDashboardData] = useState([]);
    console.log(dashboardData);

    useEffect( ()=>{
      const FetchData = async() =>{
        const response =  await FetchAllOrganizationApiHandler();
        console.log("organizatoin all data",response.body)
        setDashboardData(response.body);
        
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
      {/* <CreateOrganization/> */}
      <OrganaizationModal/>
      </div>
       <TableContainer  sx={{ maxHeight: 345 }}>
      <Table  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Organaization Initial</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Organization Name</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Contact Email</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Status</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Created At</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboardData && dashboardData.map((row) => (
            <TableRow
              key={row.initial}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.initial}
              </TableCell>
              <TableCell align="center">{row.name_en}</TableCell>
              <TableCell align="center">{row.admin_email}</TableCell>
              <TableCell align="center" style={{color:(
                (row.active === true && 'green')||(row.active===false && 'red')
                )}}>{row.active? "Active": "Inactive"}</TableCell>
                <TableCell align="center">{getDatePlease(row.createdAt)}</TableCell>
                {/* <TableCell align='center'>
                <Button style={{align:"center",backgroundColor:(
                (row.status === "Active" && 'green')||(row.status==="Pending" && 'blue') || (row.status ==="Inactive" && 'orange') || (row.status==="Blocked" && 'red')
                )}}>{row.status}</Button>
                </TableCell> */}
                <TableCell align="center">
                    

   <Stack justifyContent="center" spacing={2} direction="row">
      <Button variant="contained" >Update</Button>
      <Button variant="outlined" color="error">
        Block
      </Button>
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

export default SuperAdminDashboardTable

