import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material/styles'; // Import useTheme from @mui/material/styles

const SerialNumber = () => {
  const theme = useTheme(); // Use useTheme to access the theme

  return (
    <FormControlLabel
      value="start"
      control={<Radio defaultChecked />}
      label={<span style={{ color: theme.palette.primary.main }}>Serial No - 12345</span>}
      labelPlacement="start"
      sx={{ marginRight: '5px' }}
    />
  );
};

export default SerialNumber;
