import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ChartComponents from '../../ChartComponents';
import Layout from '../../CommonComponents/Layout'

const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{

    if(!localStorage.getItem('access_token'))
    {
        navigate('/')
    }
  },[navigate])
  return (
    <>
    {/* <Layout/> */}
    <ChartComponents/>
    </>
  )
}

export default Home