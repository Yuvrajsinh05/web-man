import React, { useState } from 'react';
import { Grid, Paper, Typography, Tabs, Tab, Select, MenuItem } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleResponseFormatChange = (event) => {
    // Handle response format change here
  };

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
                <Typography variant="subtitle1" style={{ color: tabValue === 0 ? green[500] : red[500] }}>
                  Status Code: <strong>{tabValue === 0 ? '200' : '400'}</strong>
                </Typography>
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
  // Dummy data for demonstration
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xyz123',
    'User-Agent': 'MyApp/1.0'
  };

  const cookies = {
    'session_id': 'abc123',
    'user_id': '123456'
  };

  const body = {
    'username': 'example_user',
    'password': 'secretpassword'
  };

  return (
    <Grid item xs={12} mt={3}>
      <Typography variant="body1">
        {tabValue === 0 && (
          <div>
            <Typography variant="subtitle1">Headers:</Typography>
            <ul>
              {Object.entries(headers).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        {tabValue === 1 && (
          <div>
            <Typography variant="subtitle1">Cookies:</Typography>
            <ul>
              {Object.entries(cookies).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        {tabValue === 2 && (
          <div>
            <Typography variant="subtitle1">Body:</Typography>
            <pre>{JSON.stringify(body, null, 2)}</pre>
          </div>
        )}
      </Typography>
    </Grid>
  );
};
