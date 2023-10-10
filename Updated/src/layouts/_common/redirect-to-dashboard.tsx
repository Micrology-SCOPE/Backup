import React from 'react';
import { Box } from '@mui/material';
import icon from '../../assets/icons/nav-bar/ic_home.svg';

const BankingButton = () => (
  <Box display="flex" alignItems="center">
    <img src={icon} alt="Logo" style={{ width: '30px', height: '25px' }} />
  </Box>
);

export default BankingButton;
