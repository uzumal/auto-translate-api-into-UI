'use client'

import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const ApiRequest: React.FC = () => {
  const [url, setUrl] = useState('');
  const [apiResult, setApiResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setApiResult(JSON.stringify(data));
    } catch (error) {
      setApiResult('Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div>
      <TextField
        label="URL"
        value={url}
        onChange={handleUrlChange}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleSendRequest}>
        Send
      </Button>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <Typography variant="body1">{apiResult}</Typography>
      )}
    </div>
  );
};

export default ApiRequest;
