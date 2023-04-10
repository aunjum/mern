import React,{useEffect} from 'react'
import Layout from '../../CommonComponents/Layout'
import styles from "./AdminDashboard.module.css"
import AdminDashboardStatus from './AdminDashboardStatus'
import AdminDashboardTable from './AdminDashboardTable'
import AdminTab from './AdminTab'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
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
        <AdminDashboardStatus/>
      </div>
    <div className={styles["adminDashboardTable-wraper"]}>
      <AdminTab/>
       {/* <AdminDashboardTable/> */}
    </div>
    </div>
    </Layout>

    </>
  )
}

export default AdminDashboard