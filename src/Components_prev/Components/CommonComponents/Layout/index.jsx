import React from 'react'
import LoginHeader from '../../WelcomeComponents/LoginHeader'
import LoginFooter from '../../WelcomeComponents/LoginFooter'
import styles from "./Layout.module.css"
import SidebarLayout from '../SidebarLayout'

const Layout = ({ headerTitle, children }) => {
  return (
    <>
    <div className={styles[`main-body-wrapper`]}>
        <SidebarLayout />
        <div className={styles[`main-body`]}>
          <LoginHeader/>

          {children}
        </div>
        <LoginFooter />
      </div>
    </>
  )
}

export default Layout