// components/ApiForm.tsx
'use client'

import { TextField, Button, CircularProgress } from '@mui/material';

interface ApiFormProps {
    apiUrl: string;
    setApiUrl: React.Dispatch<React.SetStateAction<string>>;
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    handleSendRequest: () => void;
    loading: boolean;
  }

const ApiForm: React.FC<ApiFormProps> = ({
  apiUrl,
  setApiUrl,
  apiKey,
  setApiKey,
  handleSendRequest,
  loading
}) => {  return (
    <div>
      <TextField
        label="Enter API URL"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
      />
      <TextField
        label="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendRequest}
        disabled={loading}
        endIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </div>
  );
};

export default ApiForm;
