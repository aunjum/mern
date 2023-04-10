import React, {useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import GetTrackDeviceDataAPI from './GetTrackDeviceDataAPI';

const DetailDialog = (props) => {

    const [openDialog, setOpenDialog] = useState(false);

    const project_id = props.data;

    const handleOpenDialog = async () => {
        console.log('==========handleOpenDialog starts==========');
        GetTrackDeviceDataAPI(project_id);
        setOpenDialog(true);
        console.log('==========handleOpenDialog ends==========');
      };
    
      const handleCloseDialog = () => {
        console.log('==========handleCloseDialog starts==========');
        setOpenDialog(false);
        console.log('==========handleCloseDialog ends==========');
      };

    return (
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
                          <TableCell align='center'>{props.trackDeviceData.notStartedTracks === "" ? "null": props.trackDeviceData.notStartedTracks}</TableCell>
                          <TableCell align="center">{props.trackDeviceData.startedTracks === "" ? "null": props.trackDeviceData.startedTracks}</TableCell>
                          <TableCell align="center">{props.trackDeviceData.endedTracks === "" ? "null": props.trackDeviceData.endedTracks}</TableCell>
                          <TableCell align="center">{props.trackDeviceData.devices === "" ? "null": props.trackDeviceData.devices}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <DialogActions>
                      <Button autoFocus onClick={handleCloseDialog}>
                        Close
                      </Button>
                    </DialogActions>
                </Dialog>
    )
}

export default DetailDialog;