import './App.css';
import * as React from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import dummyHttpRequests from './httpreqs';

import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DynamicBoxLine from './component/reqestsboxline';
import HttpRequestInput from './component/dropurlsend/dropdownsend';
import {DrawerHeader ,AppBar ,Drawer ,ContentWrapper} from"./customConfig";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUrl } from './features/requestSlice';
import RequestPanelTabs from './component/reqpanel/reqpanel';



function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const requests = useSelector(state => state.request.value);
  const currentUrl = useSelector(state => state.request.currentUrl);

  const dispatch =  useDispatch()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Custom dark and gray theme
  const darkGrayTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#9e9e9e', // gray color
      },
    },
  });

  return (
    <ThemeProvider theme={darkGrayTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ width: '85%' }} variant="h4" noWrap component="div">
              <span style={{ color: 'green' }}><b> Web</b></span><span style={{ color: 'orange' }}> Man <SmartToyIcon/> </span>
            </Typography>
            <div style={{ float: 'right' }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', margin: 'auto' }} variant="h6" noWrap component="div">
                <a href='https://github.com/Yuvrajsinh05/web-man' style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }} target='_blank'>
                  <span style={{ fontSize: 'inherit' }}>Developed By</span>
                  <GitHubIcon style={{ fontSize: 'inherit', marginLeft: '0.5em' }} />
                </a>
              </Typography>
            </div>


          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ fontSize: '0.8rem', color: 'darkcyan' }}>
                  <AddToPhotosIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: '0.9rem', overflowWrap: 'break-word', color: 'darkcyan' }}
                  primary={"Add New Request"}
                />
              </ListItemButton>
            </ListItem>
            {requests.map((request, index) => (
              <ListItem onClick={()=>dispatch(setCurrentUrl(request))} key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: request?.method === 'GET' ? "#1b5e20" : (request?.method === 'POST' ? '#f57f17' : 'white') , fontSize:'0.8rem' }}
>
                    {request?.method || "N/S"}
                  </ListItemIcon>
                  <Tooltip title={request.url} arrow>
                    <ListItemText
                      sx={{ fontSize: '0.9rem', overflowWrap: 'break-word' }}
                      primary={request.url.length > 30 ? `${request.url.substring(0, 30)}...` : request.url}
                    />
                  </Tooltip>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <ContentWrapper sx={{ padding: 0.5 }}>
          <DrawerHeader />
          <DynamicBoxLine dummyHttpRequests={dummyHttpRequests} />
          <div style={{fontSize:'10px' ,paddingLeft:'15px' ,color:'gray'}}>{currentUrl?.url}</div>
          <div className={'checkBox'}>
            <Typography paragraph>
               <HttpRequestInput/>
            </Typography>
            <Typography paragraph>
              <RequestPanelTabs/>
            </Typography>
          </div>
        </ContentWrapper>
      </Box>
    </ThemeProvider>
  );
}

export default App;

