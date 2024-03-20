import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, InputAdornment, TextField, MenuItem } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, increment } from '../../features/requestSlice';


const RootContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '1rem',
});

const HttpMethodSelector = styled(TextField)({
  marginRight: '8px',
});

const UrlTextField = styled(TextField)({
  flexGrow: 1,
  marginRight: '8px',
});

const SendButton = styled(Button)({
  marginLeft: '8px',
});

const HttpRequestInput = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch()
  const allrequests = useSelector((state) => state.request.value)
  const currentUrl = useSelector(state => state.request.currentUrl);


  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSend = () => {
    dispatch(addRequest({ method, url , id: allrequests.length+1}))
  };

  return (
    <RootContainer>
      <HttpMethodSelector
        select
        value={currentUrl?.method || ''}
        onChange={handleMethodChange}
        variant="outlined"
        InputProps={{ sx: { color:currentUrl?.method === 'GET' ? 'green' : 'orange' } }}
      >
        <MenuItem value="GET" sx={{ color: 'green' }}>
          GET
        </MenuItem>
        <MenuItem value="POST" sx={{ color: 'orange' }}>
          POST
        </MenuItem>
      </HttpMethodSelector>
      <UrlTextField
        placeholder="Enter URL"
        variant="outlined"
        value={currentUrl?.url}
        onChange={handleUrlChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendButton
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                onClick={handleSend}
              >
                Send
              </SendButton>
            </InputAdornment>
          ),
        }}
      />
    </RootContainer>
  );
};

export default HttpRequestInput;