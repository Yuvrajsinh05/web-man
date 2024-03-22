import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TextField, Box, Grid, IconButton, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import ResponseDetails from './response';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, modifyRequest, setCurrentUrl } from '../../features/requestSlice';


function RequestPanelTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  const [headers, setHeaders] = useState([{ key: 'Authorization', value: '' }, { key: 'Content-Type', value: '' }]);
  const [inputValue, setInputValue] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const currentUrl = useSelector(state => state.request.currentUrl);
  const allrequests = useSelector((state) => state.request.value)
  const dispatch = useDispatch();





  useEffect(() => {
    if (currentUrl?.id && isValidJson && inputValue) {
      let tempObjUrl = { ...currentUrl }
      tempObjUrl['body'] = JSON.parse(inputValue)
      dispatch(modifyRequest(tempObjUrl))
      dispatch(setCurrentUrl(tempObjUrl))
    } else {
      if (isValidJson && inputValue) {
        dispatch(addRequest({ url: "NEW URL", id: allrequests?.length + 1, body: JSON.parse(inputValue) }))
        dispatch(setCurrentUrl({ url: "NEW URL", id: allrequests?.length + 1, body: JSON.parse(inputValue) }))
      }
    }
  }, [inputValue])




  useEffect(() => {
    if (!currentUrl?.body) {
      setInputValue('')
      return
    };
    setInputValue(JSON.stringify(currentUrl?.body, null, 2))
  }, [currentUrl])

  useEffect(() => {
    if (!currentUrl?.headers) {
      setHeaders([{ key: 'Authorization', value: '' }, { key: 'Content-Type', value: '' }]);
      return;
    }
    const newHeaders = Object.entries(currentUrl.headers).map(([key, value]) => ({ key, value }));
    setHeaders(newHeaders);
  }, [currentUrl]);



  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() === '') {
      setIsValidJson(true);
    } else {
      try {
        JSON.parse(value);
        setIsValidJson(true);
      } catch (error) {
        setIsValidJson(false);
      }
    }
  };

  function handleStoreHeader(updatedHeaders) {
    const desiredObject = {};
    updatedHeaders.forEach(item => {
      desiredObject[item.key] = item.value;
    })
    if(currentUrl?.id){
      let cloneObjUrl = {...currentUrl}
      cloneObjUrl.headers = desiredObject
      dispatch(modifyRequest(cloneObjUrl))
      dispatch(setCurrentUrl(cloneObjUrl))
    }else{
      dispatch(addRequest({ url: "NEW URL", id: allrequests?.length + 1 ,headers :desiredObject} ))
      dispatch(setCurrentUrl({ url: "NEW URL", id: allrequests?.length + 1 ,headers :desiredObject}))
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleHeaderChange = (index, field, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
    handleStoreHeader(updatedHeaders)
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
    handleStoreHeader(updatedHeaders)
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tabs orientation="horizontal" value={tabIndex} onChange={handleTabChange}>
          <Tab label="Headers" />
          <Tab label="Body" />
        </Tabs>
      </Grid>
      <Grid item xs={12} md={6}>
        <TabPanelContainer value={tabIndex} index={0}>
          {headers.map((header, index) => (
            <Grid container spacing={1} key={index} sx={{ marginTop: index === 0 ? '0px' : '5px' }} alignItems="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
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
        <TabPanelContainer value={tabIndex} index={1}>
          <TextField
            sx={{
              margin: 0,
            }}
            fullWidth
            multiline
            rows={20}
            value={inputValue}
            onChange={handleInputChange}
            error={!isValidJson && inputValue.trim() !== ''}
            helperText={!isValidJson && inputValue.trim() !== '' && "Invalid JSON format"}
          />
        </TabPanelContainer>
      </Grid>
      <Grid item xs={12} p={3} md={6}>
        <ResponseDetails />
      </Grid>
    </Grid>
  );
}

function TabPanelContainer(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
      {value === index && (
        <Box p={1} sx={{ marginRight: '1.9rem', borderRadius: '5px' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default RequestPanelTabs;
