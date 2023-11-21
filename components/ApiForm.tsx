import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { CustomForm } from '../styles/styles';

type ApiFormProps = {
  apiUrl: string;
  apiKey: string;
  loading: boolean;
  setApiUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  handleSendRequest: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ApiForm: React.FC<ApiFormProps> = ({
  apiUrl,
  apiKey,
  loading,
  setApiUrl,
  setApiKey,
  handleSendRequest,
}) => (
  <Grid container direction='row' justifyContent='center' alignItems='center' columnSpacing={'2px'} width={'100%'}>
    <Grid item xs={4}>
      <TextField
        required
        fullWidth
        id="api-url"
        label="Enter API URL"
        name="api-url"
        autoComplete="api-url"
        autoFocus
        onChange={(e) => setApiUrl(e.target.value)}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        required
        fullWidth
        name="api-key"
        label="Enter API Key"
        type="text"
        id="api-key"
        autoComplete="current-api-key"
        onChange={(e) => setApiKey(e.target.value)}
      />
    </Grid>
    <Grid item xs={4}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        style={{height: '55px'}}
      >
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </Grid>
  </Grid>
);

export default ApiForm;