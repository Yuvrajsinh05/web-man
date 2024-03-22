import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, InputAdornment, TextField, MenuItem } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, modifyRequest, setCurrentUrl } from '../../features/requestSlice';
import { executeRequest } from '../../features/requestCaller';


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


  const handleSend = async () => {
    if (currentUrl?.id) {
      let modified = { ...currentUrl, method: method, url: url };
      let response = await executeRequest(modified)
      modified = { ...modified, response }
      dispatch(modifyRequest(modified))
      dispatch(setCurrentUrl(modified))
    } else {
      let checkUrl = url || "New URL"
      let response = await executeRequest({ method, url: checkUrl, id: allrequests?.length + 1 })
      dispatch(addRequest({ method, url: checkUrl, id: allrequests?.length + 1 ,response}))
      dispatch(setCurrentUrl({ method, url: checkUrl, id: allrequests?.length + 1 ,response}))
    }
  };

  return (
    <RootContainer>
      <HttpMethodSelector
        select
        value={method || ''}
        onChange={(e) => handleMethodChange(e)}
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
