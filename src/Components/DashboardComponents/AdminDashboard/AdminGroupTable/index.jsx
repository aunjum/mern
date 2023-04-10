import React, {useState, useEffect} from 'react'
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
import styles from './AdminGroupTable.module.css';
import FetchAllGroupApiHandler from '../../../GroupComponents/CreateGroup/GroupApiHandler/FetchAllGroupApiHandler';

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
    createData('kamal', 'user', "ETTMS", "Erase data","Active"),
    createData('jamal1', 'user1', "atoms", "clear data","Inactive"),
    createData('lamal', 'user2', "ETTMS", "Erase data","Pending"),
    createData('pamal', 'user1', "atoms", "clear data","Inactive"),
    createData('oamal', 'user', "ETTMS", "Erase data","Blocked"),
    createData('uamal', 'user2', "atoms", "clear data","Inactive"),
    createData('eamal', 'user1', "ETTMS", "Erase data","Pending"),
    createData('wamal', 'user', "atoms", "vala data","Active"),
    createData('samal', 'user4', "ETTMS", "Erase data","Pending"),
    createData('aamal', 'user', "atoms", "data data","Inactive"),
    createData('samal', 'user3', "ETTMS", "Erase data","Active"),
    createData('camal', 'user6', "atoms", "insert data","Active"),
    createData('jamal2', 'user2', "ETTMS", "delete data","Pending"),
    createData('bamal', 'user5', "atoms", "delete data","Active"),
    createData('zamal', 'user', "ETTMS", "Erase data","Blocked"),
  ];

  const getDatePlease = (D) =>{
    return new Date(D).toLocaleString();
  }
 

const AdminGroupTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [groupData, setGroupData] = useState([]);

  console.log(groupData)
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect( ()=>{
        const FetchData = async() =>{
          const response =  await FetchAllGroupApiHandler();
          console.log("organizatoin all data",response.body)
          setGroupData(response.body);
          
        }
       FetchData()
    
      },[])
  
  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      
       <TableContainer  sx={{ maxHeight: 345 }}>
      <Table  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Group Name</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Group Status</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Created At</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Updated At</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupData && groupData.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name_en}
              </TableCell>
              <TableCell align="center" style={{color:(
                (row.active === true && 'green')||(row.active===false && 'red')
                )}}>{row.active? "Active": "Inactive"}</TableCell>
                <TableCell align="center">{getDatePlease(row.createdAt)}</TableCell>
                <TableCell align="center">{getDatePlease(row.updatedAt)}</TableCell>
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
        count={groupData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}

export default AdminGroupTable

