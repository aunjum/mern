import {React,useState,useRef} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Tooltip from '@mui/material/Tooltip';
import styles from './GlobalSearch.module.css';

// export const GlobalSearch = () => {
// 
// }

export default function GlobalSearch(props) {
    const [value,setValue] = useState("");
    const [click, setClick] = useState();
    console.log("search value ",props);

    // const handleSearch = (e) =>{
    //     // e.preventDefault();
    //     setValue(e.target.value);
    //     // callback(value);
    // }
  //   const ref = useRef(null);

  // const handleClick = () => {
  //   alert("hello");
  //   ref.current.focus();
  // };

  return (
    <>
   
      <Tooltip title="Search">
      <IconButton type="button" color="primary" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Tooltip>
      <InputBase
        type='text'
        sx={{ ml: 1, flex: 1 ,'&:hover': {
          borderBottom: '2px solid black',
         
        }}}
        placeholder="Search in Page"
        inputProps={{ 'aria-label': 'search' }}
        value = {props.SearchItem}
        
        // onChange = {handleSearch}
        onChange={(e)=>{props.setSearchItem(e.target.value)}}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
     
    </>
  );
}