import './App.css';
import * as React from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
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
import { Button } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DynamicBoxLine from './component/reqestsboxline';


const drawerWidth = 340;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'auto',
}));

function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
              <span style={{ color: 'green' }}><b>Web</b></span><span style={{ color: 'orange' }}> Man</span>
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
            {dummyHttpRequests.map((request, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: request.method == 'GET' ? "#1b5e20" : "#f57f17", fontSize: '0.8rem' }}>
                    {request.method}
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
          <div className={'checkBox'}>
            <Typography paragraph>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis.
              ras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac. */}
            </Typography>
            <Typography paragraph>
              {/* Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. */}
            </Typography>
          </div>
        </ContentWrapper>
      </Box>
    </ThemeProvider>
  );
}

export default App;

