import React,{useEffect} from 'react'
import styles from "./RecordTableView.module.css"
import { useNavigate , useLocation} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Layout from '../../../../CommonComponents/Layout';
import RecordTable from './RecordTable';


const RecordTableView = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const { id } = state; 
  console.log(id);
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
         <h2 className={styles['recordHeaderCenter']}>Track Record Information</h2>
      </div>
    <div className={styles["adminDashboardTable-wraper"]}>
     {/* <HorizontalStackBarChart/> */}
    <RecordTable id={id}/>
    </div>
    </div>
    </Layout>
    </>
  )
}

export default RecordTableView