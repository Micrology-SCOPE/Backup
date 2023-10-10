import React from 'react';
import { Box } from '@mui/material';
import bankingIcon from '../../assets/icons/nav-bar/ic_banking.svg';

const BankingButton = () => (
  <Box display="flex" alignItems="center">
    <img src={bankingIcon} alt="Logo" style={{ width: '30px', height: '25px' }} />
  </Box>
);

export default BankingButton;
