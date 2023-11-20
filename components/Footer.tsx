
// Footer.tsx
import React from 'react';
import { StyledFooter } from '../styles/styles';
import { Typography } from '@mui/material';

const Footer: React.FC = () => (
  <StyledFooter>
    <Typography variant="body2" color="text.secondary" align="center">
      Privacy Policy ・ Terms of Service
    </Typography>
  </StyledFooter>
);

export default Footer;