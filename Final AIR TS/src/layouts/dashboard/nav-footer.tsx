import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import facebook from '../../assets/icons/footer/ic_facebbook.svg';
import instagram from '../../assets/icons/footer/ic_instagram.svg';
import linkedin from '../../assets/icons/footer/ic_linkedin.svg';
import twitter from '../../assets/icons/footer/ic_twitter.svg';

const NavFooter = () => (
  <Stack
    direction={{ sm: 'row' }}
    justifyContent="space-between"
    sx={{
      position: 'sticky',
      bottom: 0,
      padding: '10px 30px',
    }}
  >
    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
      © 2023 Copyright. &nbsp;
      <Typography component="span" variant="body2" color="#E36A11">
        SCOPE
      </Typography>
      &nbsp;All rights reserved.
    </Typography>

    <Box display="flex" alignItems="center" justifyContent="space-between" width="150px">
      <img src={facebook} alt="facebook" />
      <img src={instagram} alt="instagram" />
      <img src={linkedin} alt="linkedin" />
      <img src={twitter} alt="twitter" />
    </Box>

    <Typography variant="body2" color="primary">
      Version 1.0.0
    </Typography>
  </Stack>
);

export default NavFooter;
