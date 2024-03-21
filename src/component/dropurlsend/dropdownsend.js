import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, InputAdornment, TextField, MenuItem } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, increment, modifyRequest, setCurrentUrl } from '../../features/requestSlice';


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


  useEffect(() => {
    setMethod(currentUrl?.method)
    setUrl(currentUrl?.url)
  }, [currentUrl])

  const handleMethodChange = (event) => {
    const meth = event.target.value || ''
    setMethod(meth);
  };

  const handleUrlChange = (event) => {
    event.preventDefault(); 
    const newUrl = event?.target?.value || '';
    setUrl(newUrl);
  };
  

  const handleSend = () => {
    if (currentUrl?.id) {

      const modified = {
        id: currentUrl.id,
        method,
        url
      }
      dispatch(modifyRequest(modified))
    } else {
      let checkUrl = url || "New URL"
      dispatch(addRequest({ method, url:checkUrl, id: allrequests?.length + 1 }))
      dispatch(setCurrentUrl({ method, url:checkUrl, id: allrequests?.length + 1 }))
    }
  };

  return (
    <RootContainer>
      <HttpMethodSelector
        select
        value={method || ''}
        onChange={(e)=> handleMethodChange(e)}
        variant="outlined"
        InputProps={{ sx: { color: method === 'GET' ? 'green' : 'orange' } }}
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
        value={url}
        onChange={(e) => handleUrlChange(e)}
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
