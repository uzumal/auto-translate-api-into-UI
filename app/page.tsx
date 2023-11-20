'use client'
// pages/api-explorer.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApiForm from '../components/ApiForm';
import { StyledContainer } from '../styles/styles';

const ApiExplorer = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // ... 送信ロジック
  };

  return (
    <>
      <Header />
      <Container style={{height: '85vh', paddingTop: '200px', width: '100%'}}>
        <Typography component="h1" variant="h4" align="left" gutterBottom>
          Interact with Your API
        </Typography>
        <Typography component='h3' align='left' gutterBottom>
          Enter Details and Send Request
        </Typography>
        <ApiForm
          apiUrl={apiUrl}
          apiKey={apiKey}
          loading={loading}
          setApiUrl={setApiUrl}
          setApiKey={setApiKey}
          handleSendRequest={handleSendRequest}
          />
        <Typography component="h1" variant="h4" align="left" gutterBottom>
          Results
        </Typography>
        {results && (
          <Box component="pre" sx={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {results}
          </Box>
        )}
        <Typography component='h3' align='left' gutterBottom>
          Your results will appear here after submitting.
        </Typography>
        </Container>
      <Footer />
    </>
  );
};

export default ApiExplorer;
