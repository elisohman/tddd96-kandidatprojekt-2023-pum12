import React from 'react'
import logo from '../../image/logo.png'

export default function SidebarHeader() {
  return (
    <div>
      <p className='CompanyName'>Neue</p>
      <img src={logo} id="logo" className='CompanyLogo'></img>
    </div>
  )
}
