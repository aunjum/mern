import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminUserTable from "../AdminUserTable";
import AdminProjectTable from "../AdminProjectTable";
import AdminPermissionTable from "../AdminPermissionTable";
import { Button } from "@mui/material";
import styles from './AdminTab.module.css';
import GroupModal from "../../../GroupComponents/GroupModal";
import UserModal from "../../../UserComponents/UserModal";
import PermissionModal from "../../../PermissionComponents/PermissionModal";
import AdminGroupTable from "../AdminGroupTable";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

const AdminTab = () => {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Group" {...a11yProps(0)} />
          <Tab label="Permission" {...a11yProps(1)} />
          <Tab label="User" {...a11yProps(2)} />
          <Box flexGrow={1} />
          {value === 0 ?
          // <Button  variant="contained">Add Group</Button>
          <GroupModal/> 
          : value === 1 ?
          <PermissionModal/>
          : 
          <UserModal/>
        }
        
          {/* <Tab label="Add User" {...a11yProps(3)} /> */}
          {/* <Button className={styles['user-add-button']}>Add User</Button> */}
          {/* <Button className={styles['user-add-button']} variant="contained">Add User</Button> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       
        {/* <AdminProjectTable/> */}
        <AdminGroupTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AdminPermissionTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminUserTable/>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <Button>Add User</Button>
      </TabPanel> */}
      
    </Box>
    
    </>
  )
}

export default AdminTab;