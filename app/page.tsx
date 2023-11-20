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
      <CssBaseline />
      <Header />
      <StyledContainer maxWidth="lg">
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Interact with Your API
        </Typography>
        <ApiForm
          apiUrl={apiUrl}
          apiKey={apiKey}
          loading={loading}
          setApiUrl={setApiUrl}
          setApiKey={setApiKey}
          handleSendRequest={handleSendRequest}
        />
        {results && (
          <Box component="pre" sx={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {results}
          </Box>
        )}
      </StyledContainer>
      <Footer />
    </>
  );
};

export default ApiExplorer;
