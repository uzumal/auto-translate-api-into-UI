import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OpenAIQueryComponent from './OpenAIQueryComponent'

type ResultDisplayProps = {
  results: string;
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  return (
    <div>
      {results ? (
        <Box
          component="pre"
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景を少し透明に
            padding: '10px',
            whiteSpace: 'pre-wrap',
            borderRadius: '10px', // 角を丸くする
            '::-webkit-scrollbar': {
              width: '0px'
            }
          }}
        >
        <OpenAIQueryComponent prompt={"Use Recharts to create a Next.js React component. The response should only be Next.js code. As we intend to use it as a single component, please make sure it fits in a single file. Generate code to draw a graph based on the following JSON data.: results"} />
        </Box>
      ) : (
        <Typography component='h3' align='left' gutterBottom>
          Your results will appear here after submitting.
        </Typography>
      )}
    </div>
  );
};

export default ResultDisplay;
