import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

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
}) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      handleSendRequest(event);
    }
  };

  return (
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
        sx={{
          '& label.Mui-focused': {
            color: '#4caf50', // 明るい緑色のフォーカス時の色
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#4caf50', // アンダーラインのフォーカス時の色
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50', // アウトラインのフォーカス時の色
            },
          },
          '& .MuiInputBase-input': {
            color: '#33CCFF', // テキストの色
          },
        }}
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
        sx={{
          '& label.Mui-focused': {
            color: '#4caf50', // 明るい緑色のフォーカス時の色
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#4caf50', // アンダーラインのフォーカス時の色
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50', // アウトラインのフォーカス時の色
            },
          },
          '& .MuiInputBase-input': {
            color: '#33CCFF', // テキストの色
          },
        }}
      />
    </Grid>
    <Grid item xs={4}>
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            style={{
              height: '55px',
              background: 'linear-gradient(45deg, #66bb6a 30%, #43a047 90%)',
              color: '#1b5e20',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </Grid>
  </Grid>
  );
};

export default ApiForm;