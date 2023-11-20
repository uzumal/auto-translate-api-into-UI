import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, CssBaseline, Grid, FormControl, FormLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { styled } from '@mui/system';

// Customized Styles
const StyledContainer = styled(Container)({
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: '0.25rem',
  padding: '20px',
  marginTop: '20px',
  color: '#333',
  maxWidth: '1130px',
});

const StyledFooter = styled(Box)({
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
  padding: '1rem',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
});

const ApiExplorer = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResults('');
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      <CssBaseline />
      <div style={{ background: '#f0f0f0', minHeight: '100vh' }}>
        <StyledContainer>
          <Typography component="h1" variant="h4" align="center" gutterBottom style={{ color: '#333', fontSize: '1.75rem' }}>
            Interact with Your API
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl component="form" onSubmit={handleSendRequest} sx={{ mt: 1 }}>
                <FormLabel htmlFor="api-url">API URL</FormLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="api-url"
                  label="API URL"
                  name="api-url"
                  autoComplete="api-url"
                  autoFocus
                  variant="outlined"
                  onChange={(e) => setApiUrl(e.target.value)}
                  style={{ background: 'white', borderRadius: '0.25rem' }}
                />
                <FormLabel htmlFor="api-key">API Key</FormLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="api-key"
                  label="API Key"
                  type="text"
                  id="api-key"
                  autoComplete="current-api-key"
                  variant="outlined"
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ background: 'white', borderRadius: '0.25rem' }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#2193b0' }}
                  disabled={loading}
                  style={{ borderRadius: '0.25rem' }}
                >
                  {loading ? 'Sending...' : 'Send'}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              {results && (
                <Typography variant="body1" sx={{ mt: 2, color: '#333' }}>
                  Results:
                  {typeof results === 'string' ? (
                    <Box component="pre" sx={{ overflowX: 'auto', whiteSpace: 'pre-wrap', background: 'white', padding: '1rem', borderRadius: '0.25rem' }}>
                      {results}
                    </Box>
                  ) : (
                    <>
                      <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Age</TableCell>
                              <TableCell align="right">Gender</TableCell>
                              <TableCell align="right">Occupation</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {results.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">{row.age}</TableCell>
                                <TableCell align="right">{row.gender}</TableCell>
                                <TableCell align="right">{row.occupation}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <BarChart width={600} height={300} data={results}>
                        <XAxis dataKey="name" stroke="#333" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="age" fill="#2193b0" />
                      </BarChart>
                    </>
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
        </StyledContainer>
        <StyledFooter>
      </div>
    </>
  );
};

export default ApiExplorer;
