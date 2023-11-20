import React from 'react';
import { TextField, Button } from '@mui/material';
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
  <CustomForm onSubmit={handleSendRequest}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="api-url"
      label="API URL"
      name="api-url"
      autoComplete="api-url"
      autoFocus
      onChange={(e) => setApiUrl(e.target.value)}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="api-key"
      label="API Key"
      type="text"
      id="api-key"
      autoComplete="current-api-key"
      onChange={(e) => setApiKey(e.target.value)}
    />
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
    >
      {loading ? 'Sending...' : 'Send'}
    </Button>
  </CustomForm>
);

export default ApiForm;