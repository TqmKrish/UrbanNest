import React from 'react'
import NavbarComponent from '../CommonComponents/Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="row mx-0 w-100">
      <NavbarComponent />
      <div className="content-wrapper">{<Outlet />}</div>
    </div>
  )
}

export default AdminLayout