// pages/api-explorer.tsx
'use client'
import { Container, TextField, Button, Box, Typography, AppBar, Toolbar, Link } from '@mui/material';
import { useState } from 'react';
import ApiForm from '@/components/ApiForm';
import ResultsDisplay from '../components/ResultsDisplay';

const ApiExplorer = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    setResults(''); // 既存の結果をクリア
    try {
      const response = await fetch(apiUrl, {
        method: 'GET', // または 'POST', 'PUT', 'DELETE' 等
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey // 必要に応じて調整
        },
        // body: JSON.stringify(data) // POST/PUTリクエストの場合
      });
      const data = await response.json();
      setResults(JSON.stringify(data, null, 2)); // 結果を整形して状態に保存
    } catch (error) {
      setResults(`Error: ${error}`); // エラーを状態に保存
    }
    setLoading(false);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            API Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant="h5">
            Interact with Your API
          </Typography>
          <Typography variant="h7">
            Enter Details and Send Request
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="api-url"
              label="Enter API URL"
              name="api-url"
              autoComplete="api-url"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="api-key"
              label="Enter API Key"
              type="api-key"
              id="api-key"
              autoComplete="current-api-key"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Results
        </Typography>
        {/* ResultsDisplayの使用 */}
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Privacy Policy ・ Terms of Service
        </Typography>
      </Box>
    </>
  );
};

export default ApiExplorer;
