import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

interface CbTypeOption {
  value: string;
  label: string;
}

const CbType: CbTypeOption[] = [
  { value: 'GL 316', label: 'GL 316' },
  { value: 'SMP 36', label: 'SMP 36' },
  { value: 'SFM 40AA', label: 'SFM 40AA' },
];

const CbAddMenu = () => {
  const [type, setType] = useState<string>('GL 316');

  const handleTypeChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  }, []);

  return (
    <Paper elevation={5} sx={{ width: '60vw', padding: '30px' }}>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ margin: '0 0 30px 0' }}>
        <TextField
          variant="outlined"
          select
          sx={{ width: '15vw' }}
          label="Type"
          value={type}
          onChange={handleTypeChange}
        >
          {CbType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          variant="outlined"
          select
          sx={{ width: '15vw' }}
          label="Manufacturer"
          value={type}
          onChange={handleTypeChange}
        >
          {CbType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          select
          sx={{ width: '15vw' }}
          label="Mechanism"
          value={type}
          onChange={handleTypeChange}
        >
          {CbType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          select
          sx={{ width: '15vw' }}
          label="System Voltage"
          value={type}
          onChange={handleTypeChange}
        >
          {CbType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h3" fontWeight="bold">
          Measurement References
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Typography variant="h5" fontWeight="bold">
            Timing Channel
          </Typography>
          <TextField
            variant="outlined"
            select
            sx={{ width: '15vw' }}
            label="Close Time"
            value={type}
            onChange={handleTypeChange}
          >
            {CbType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            select
            sx={{ width: '15vw' }}
            label="Open Time "
            value={type}
            onChange={handleTypeChange}
          >
            {CbType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Travel Channel
          </Typography>
          <TextField
            variant="outlined"
            select
            sx={{ width: '15vw' }}
            label="Linkage Ratio "
            value={type}
            onChange={handleTypeChange}
          >
            {CbType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="35vw">
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Datum Points
              </Typography>
              <Box display="flex" flexDirection="column">
                <TextField
                  variant="outlined"
                  select
                  sx={{ width: '15vw' }}
                  label="Method"
                  value={type}
                  onChange={handleTypeChange}
                >
                  {CbType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  select
                  sx={{ width: '15vw' }}
                  label="Close1"
                  value={type}
                  onChange={handleTypeChange}
                >
                  {CbType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  select
                  sx={{ width: '15vw' }}
                  label="Close2"
                  value={type}
                  onChange={handleTypeChange}
                >
                  {CbType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Default Points
              </Typography>
              <Box display="flex" flexDirection="column">
                <TextField
                  variant="outlined"
                  select
                  sx={{ width: '15vw' }}
                  label="Method"
                  value={type}
                  onChange={handleTypeChange}
                >
                  {CbType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  select
                  sx={{ width: '15vw' }}
                  label="Close"
                  value={type}
                  onChange={handleTypeChange}
                >
                  {CbType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CbAddMenu;
