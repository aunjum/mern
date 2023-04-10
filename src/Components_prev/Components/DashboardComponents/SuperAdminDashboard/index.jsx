import React ,{useEffect}from 'react'
import Layout from '../../CommonComponents/Layout'
import styles from "./SuperAdminDashboard.module.css"
import SuperAdminDashboardStatus from './SuperAdminDashboardStatus'
import SuperAdminDashboardTable from './SuperAdminDashboardTable'
import { useNavigate } from 'react-router-dom'
// import AdminDashboardStatus from './AdminDashboardStatus'
// import AdminDashboardTable from './AdminDashboardTable'
// import AdminTab from './AdminTab'

const SuperAdminDashboard = () => {

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
        <SuperAdminDashboardStatus/>
        
      </div>
    <div className={styles["adminDashboardTable-wraper"]}>
      <SuperAdminDashboardTable/>
    </div>
    </div>
    </Layout>

    </>
  )
}

export default SuperAdminDashboard