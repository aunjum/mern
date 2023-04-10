import React,{useEffect} from 'react'

import styles from "./TrackBoard.module.css"
import { useNavigate } from 'react-router-dom'
import Layout from '../CommonComponents/Layout';
import TrackBoardTable from './TrackBoradTable';
// import TrackBoardTable from './TrackBoradTable';


const TrackBoard = () => {
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
    <div className={styles[`trackBoard-wrapper`]}>
      <div>
     
      {/* <TrackBoardTable/> */}
      </div>
      <div className={styles["trackBoardTable-wraper"]}>
            <TrackBoardTable/>
      </div>
    </div>
    </Layout>

    </>
  )
}

export default TrackBoard