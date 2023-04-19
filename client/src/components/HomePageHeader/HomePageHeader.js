import React from 'react'
import "./HomePageHeader.css";
import logo from '../../image/logo.png'

export default function SidebarHeader() {
  return (
    <div className="SidebarHeaderContainer">

      <a href="/" className="CompanyLogoLink">

        <p className="CompanyName">Neue</p>
        <img src={logo} id="logo" className="CompanyLogo"></img>

      </a>
    
    </div>
  )
}
