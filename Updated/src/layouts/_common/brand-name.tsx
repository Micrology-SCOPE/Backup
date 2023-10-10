import React from 'react';
import { Typography, Box } from '@mui/material';
import brandLogo from '../../assets/icons/nav-bar/brand-logo.png';

const BrandName = () => (
  <Box display="flex" alignItems="center" justifyContent="center">
    <Typography variant="body1" color="#919EAB" fontWeight="bold">
      HISAC AIR BY{' '}
    </Typography>
    <img src={brandLogo} alt="Logo" style={{ width: '80px', height: '50px', marginLeft: '5px' }} />
  </Box>
);

export default BrandName;
