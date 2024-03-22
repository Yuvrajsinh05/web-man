import React, { useState } from 'react';
import { Grid, Paper, Typography, Tabs, Tab, Select, MenuItem } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// Custom dark and gray theme
const darkGrayTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9e9e9e', // gray color
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ResponseDetails = () => {
  const [tabValue, setTabValue] = useState(0);
  const currentUrl = useSelector(state => state.request.currentUrl);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };



  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return 'green'; 
    } else if (statusCode >= 400 && statusCode < 500) {
      return 'orange';
    } else if (statusCode >= 500 && statusCode < 600) {
      return 'red'; 
    } else {
      return 'black'; 
    }
  }

  function handleResponseFormatChange(){

  }
  return (
    <ThemeProvider theme={darkGrayTheme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Grid container alignItems="center" justifyContent="space-between">
              {/* Response Details */}
              <Grid item xs={12} sm={7}>
                <Typography variant="h6">Response Details</Typography>
              </Grid>
              <Grid item xs={6} sm={2.5}>
                {currentUrl?.response?.status ?  
                  <Typography variant="subtitle1" style={{ color: getStatusColor(currentUrl?.response?.status) }}>
                  Status Code: <strong>{currentUrl?.response?.status}</strong>
                </Typography>
                :  null}
              
              </Grid>
              <Grid item xs={6} sm={2.5}>
                <Typography variant="subtitle1" sx={{fontSize:'10px'}}>Response Size: <strong>1234 bytes</strong></Typography>
              </Grid>

              {/* Tabs for Headers, Cookies, Body */}
              <Grid item xs={12} sm={10}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Headers" />
                  <Tab label="Cookies" />
                  <Tab label="Body" />
                </Tabs>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Select
                  value={"JSON"}
                  onChange={handleResponseFormatChange}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="JSON">JSON</MenuItem>
                  <MenuItem value="XML">XML</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {/* Display content based on selected tab */}
            <DummyDetails tabValue={tabValue} />
          </StyledPaper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ResponseDetails;

const DummyDetails = ({ tabValue }) => {
  const currentUrl = useSelector(state => state.request.currentUrl);
 


  const cookies = {};
  

  return (
<Grid item xs={12} mt={3} sx={{ overflow: 'auto', maxHeight: '400px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
  <Typography variant="body1">
    {tabValue === 0 && (
      <div>
        <ul>
          {currentUrl?.response?.headers && Object.entries(currentUrl.response.headers).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    )}
    {tabValue === 1 && (
      <div>
        <ul>
          {cookies && Object.entries(cookies).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    )}
    {tabValue === 2 && (
      <div>
        <pre>{JSON.stringify(currentUrl?.response?.body, null, 2)}</pre>
      </div>
    )}
  </Typography>
</Grid>

  );
};