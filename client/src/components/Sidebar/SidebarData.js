import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';

//https://mui.com/material-ui/material-icons/ for icons

export const SidebarData = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        link: "/home"
    },
    {
        title: 'Alarm',
        icon: <NotificationsIcon />,
        link: "/alarm"
    },
    {
        title: 'Help',
        icon: <HelpIcon />,
        link: "/help"
    },
]