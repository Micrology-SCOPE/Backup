import React from 'react';
import { Box } from '@mui/material';
import icon from '../../assets/icons/nav-bar/check-for-update.svg';

const CheckForUpdate = () => (
  <Box display="flex" alignItems="center">
    <img src={icon} alt="Logo" style={{ width: '30px', height: '25px' }} />
  </Box>
);

export default CheckForUpdate;
