// components/ResultsDisplay.tsx
'use client'
import { Typography } from '@mui/material';

interface ResultsDisplayProps {
  results: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div>
      {results && (
        <Typography variant="body1" component="p" gutterBottom>
          {results}
        </Typography>
      )}
    </div>
  );
};

export default ResultsDisplay;
