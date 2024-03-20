import React, { useState } from 'react';
import { Tabs, Tab, TextField, Box, Grid, IconButton, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function RequestPanelTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  const [headers, setHeaders] = useState([{ key: 'Authorization', value: '' },{ key: 'Content-Type', value: '' }]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleHeaderChange = (index, field, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Tabs orientation="vertical" value={tabIndex} onChange={handleTabChange}>
          <Tab label="Body" />
          <Tab label="Params" />
          <Tab label="Headers" />
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        <TabPanelContainer value={tabIndex} index={0}>
          {/* Body Tab */}
          <TextField sx={{ border: '2px solid white', margin: 0 }}  fullWidth multiline rows={4} />
        </TabPanelContainer>
        <TabPanelContainer value={tabIndex} index={1}>
          {/* Authorization Tab */}
          <TextField label="Authorization Token" variant="outlined" fullWidth />
        </TabPanelContainer>
        <TabPanelContainer value={tabIndex} index={2}>
          {/* Headers Tab */}
          {headers.map((header, index) => (
    
            <Grid container spacing={1} key={index}sx={{marginTop: index==0 ? '0px' :'5px'}} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  // variant="outlined"
                  fullWidth
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={index}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeHeader(index)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <IconButton onClick={addHeader} sx={{ mt: 1 }}>
            <Add />
            <Typography variant="body2">Add Header</Typography>
          </IconButton>
        </TabPanelContainer>
      </Grid>
    </Grid>
  );
}

function TabPanelContainer(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
      {value === index && (
        <Box p={1} sx={{marginRight:'1.9rem', borderRadius: '5px'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default RequestPanelTabs;
