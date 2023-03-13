// inspired by https://www.youtube.com/watch?v=5R9jFHlG6ik
import React from 'react';
import "./Sidebar.css";
import { SidebarData } from './SidebarData';
import logo from '../../image/logo.png';

function Sidebar(props) {
    return (
        <div className='Sidebar'>
            <div className="SidebarHeader">
                <img src={logo} id="logo"/>
                <h1 id='header'>Neue</h1>
            </div>
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li 
                            key={key} 
                            onClick={() => {window.location.pathname = val.link}}
                            className="row"
                            id={window.location.pathname === val.link ? "active" : ""}>
                            {" "}
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
            <div className="BottomCopyright">
                <p>© some text about compyright</p>
            </div>
        </div>
    );
}

export default Sidebar;