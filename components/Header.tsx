// Header.tsx
import React from 'react';
import { StyledHeader } from '../styles/styles';
import { Typography } from '@mui/material';

const Header: React.FC = () => (
  <StyledHeader>
    <Typography variant="h3" component="h1">
      API Explorer
    </Typography>
  </StyledHeader>
);

export default Header;