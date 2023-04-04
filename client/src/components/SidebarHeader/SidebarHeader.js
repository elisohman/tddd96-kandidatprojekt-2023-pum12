import React from 'react'
import "./SidebarHeader.css";
import logo from '../../image/logo.png'

export default function SidebarHeader() {
  return (
    <div className="SidebarHeaderContainer">
      <p className="CompanyName">Neue</p>
      <img src={logo} id="logo" className="CompanyLogo"></img>
    </div>
  )
}
