import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import GantHome from '../views/viatize/GantHome'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
          <GantHome/>   <GantHome/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
