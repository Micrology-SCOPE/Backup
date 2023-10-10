import React from 'react';
import { Box } from '@mui/material';
import infoLogo from '../../assets/icons/nav-bar/mdi_information-variant.svg';

const InformationButton = () => (
  <Box display="flex" alignItems="center">
    <img src={infoLogo} alt="Logo" style={{ width: '30px', height: '25px' }} />
  </Box>
);

export default InformationButton;
