import {useState, useEffect} from 'react';
import Layout from '../../CommonComponents/Layout';
import { BarChart } from './ChartComponents/BarChart';
import { PieChart } from './ChartComponents/PieChart';
import styles from "./HomePanel.module.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { HorizontalBarChart } from './ChartComponents/HorizontalBarChart';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [status, setStatus] = useState('All');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('access_token'))
    {
        navigate('/')
    }
  },[navigate])

  const handleChange = (event) => {
    console.log("<Status:", status);
    setStatus(event.target.value);
  };
  
  return (
    <>
    <Layout>
        <Box className={styles['charts-wrapper']}>
            <Grid container>
                <Grid xs={9}>
                    <div className={styles["horizontalChart"]}>
                        <HorizontalBarChart/>
                    </div>
                </Grid>
                <Grid xs={2}>
                    <FormControl sx={{ m: 1, p: 5 }} size="small">
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Started This Week">Started This Week</MenuItem>
                            <MenuItem value="Started This Month">Started This Month</MenuItem>
                            <MenuItem value="Started This Year">Started This Year</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={1}></Grid>
            </Grid>
            <Grid container>
            <Grid xs={6}>
                    <div className={styles["pieChart"]}>
                        <PieChart/>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div className={styles["barChart"]}>
                        <BarChart/>
                    </div>
                </Grid>
            </Grid>
        </Box>
    </Layout>
    </>
  )
}

export default Home