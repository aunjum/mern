import React,{useEffect} from 'react'
import Layout from '../../CommonComponents/Layout'
import styles from "./UserDashboard.module.css"
import { useNavigate } from 'react-router-dom'
import UserDashboardStatus from './UserDashboardStatus'
import UserDashboardTable from './UserDashboardTable'

const UserDashboard = () => {
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
       <UserDashboardStatus/>
      </div>
    <div className={styles["adminDashboardTable-wraper"]}>
      <UserDashboardTable/>
    </div>
    </div>
    </Layout>

    </>
  )
}

export default UserDashboard