import React,{useEffect} from 'react'
import styles from "./ChartComponents.module.css"
import { useNavigate } from 'react-router-dom'
import Layout from '../CommonComponents/Layout';
import ChartStatus from './ChartStatus';
import HorizontalStackBarChart from './HorizontalStackBarChart';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PieChart from './PieChart';
import VerticalStackBarChart from './VerticalStackBarChart';

const ChartComponents = () => {
  const navigate = useNavigate();
  useEffect(()=>{

    if(!localStorage.getItem('access_token'))
    {
        navigate('/')
    }
  },[navigate])
  return (
    <>
    <Layout>
    <div className={styles[`adminDashboard-wrapper`]}>
      <div>
        <ChartStatus/>
      </div>
    <div className={styles["adminDashboardTable-wraper"]}>
     {/* <HorizontalStackBarChart/> */}
     <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={10}>
         <HorizontalStackBarChart/>
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={5}>
          <PieChart/>
        </Grid>
        <Grid item xs={5}>
          
          <VerticalStackBarChart/>
          
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={12}>
          
        </Grid>
        </Grid>
       
    </Box>
    </div>
    </div>
    </Layout>
    </>
  )
}

export default ChartComponents