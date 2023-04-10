import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import styles from './AdminDashboardTable.module.css';

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

const AdminDashboardTable = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
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
      {/* <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={styles['adminDashboardTable-header']}
                >
                  {column.label}
                 
                </TableCell>
             
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            
                        </TableCell>
                      );
                   
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer> */}
       <TableContainer  sx={{ maxHeight: 345 }}>
      <Table  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Name</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Group</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Project</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Info</TableCell>
            <TableCell  style={{backgroundColor: ' rgb(203, 200, 200)', fontWeight:'bold'}} align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.group}</TableCell>
              <TableCell align="center">{row.project}</TableCell>
              <TableCell align="center">{row.info}</TableCell>
              <TableCell className={styles["status-wraper"]}align="center" style={{backgroundColor:(
                (row.status === "Active" && 'green')||(row.status==="Pending" && 'blue') || (row.status ==="Inactive" && 'orange') || (row.status==="Blocked" && 'red')
                )}}>{row.status}</TableCell>
                {/* <TableCell align='center'>
                <Button style={{align:"center",backgroundColor:(
                (row.status === "Active" && 'green')||(row.status==="Pending" && 'blue') || (row.status ==="Inactive" && 'orange') || (row.status==="Blocked" && 'red')
                )}}>{row.status}</Button>
                </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}

export default AdminDashboardTable

