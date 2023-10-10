import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import { usePopover } from 'src/components/custom-popover';
import Popover from '@mui/material/Popover';
import Fab from '@mui/material/Fab';
import Iconify from 'src/components/iconify';
import CbAddMenu from 'src/components/cb-settings/addMenu';

const Coil_AC_DC = [
  { value: 'AC', label: 'AC' },
  { value: 'DC', label: 'DC' },
];

const Motor_AC_DC = [
  { value: 'AC', label: 'AC' },
  { value: 'DC', label: 'DC' },
];

const Coil_Voltage = [
  { value: 220, label: 220 },
  { value: 110, label: 110 },
  { value: 48, label: 48 },
  { value: 32, label: 32 },
  { value: 24, label: 24 },
];

const Motor_Voltage = [
  { value: 220, label: 220 },
  { value: 110, label: 110 },
  { value: 48, label: 48 },
  { value: 32, label: 32 },
  { value: 24, label: 24 },
];

const CBSettings: React.FC = () => {
  const [coil_ac_dc, setCoil_Ac_Dc] = useState<string>('DC');
  const [motor_ac_dc, setMotor_Ac_Dc] = useState<string>('DC');
  const [coil_Voltage, setCoil_Voltage] = useState<number>(220);
  const [motor_Voltage, setMotor_Voltage] = useState<number>(110);

  const clickPopover = usePopover();

  const handleChange_Coil_AC_DC = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setCoil_Ac_Dc(event.target.value as string);
  }, []);

  const handleChange_Motor_AC_DC = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setMotor_Ac_Dc(event.target.value as string);
  }, []);

  const handleChange_Coil_Voltage = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setCoil_Voltage(event.target.value as number);
  }, []);

  const handleChange_Motor_Voltage = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setMotor_Voltage(event.target.value as number);
  }, []);

  const handleSpecialCharMaxLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const srNoPattern = /^[A-Za-z0-9]+$/;

    if (!srNoPattern.test(inputValue)) {
      event.target.value = inputValue.replace(/[^A-Za-z0-9]/g, '');
    }
    if (inputValue.length > 20) {
      event.target.value = inputValue.slice(0, 20);
    }
  };

  const maxInputLength10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length > 10) {
      event.target.value = inputValue.slice(0, 10);
    }
  };
  const maxInputLength20 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length > 20) {
      event.target.value = inputValue.slice(0, 20);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" sx={{ margin: '0 0 20px 0' }}>
        <Typography variant="h4" fontWeight="bold">
          CB Settings
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '0 170px 20px 170px' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
            label="Serial Number"
            defaultValue="12345"
            onChange={handleSpecialCharMaxLimit}
          />
          <InfoIcon color="action" />
        </Box>
        <Box display="flex" sx={{ width: '25vw' }} justifyContent="space-between">
          <TextField
            variant="outlined"
            select
            sx={{ width: '15vw' }}
            label="Coil Voltage"
            value={coil_Voltage}
            onChange={handleChange_Coil_Voltage}
          >
            {Coil_Voltage.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              select
              sx={{ width: '5vw', margin: '0 10px 0 0' }}
              label="AC/DC"
              value={coil_ac_dc}
              onChange={handleChange_Coil_AC_DC}
            >
              {Coil_AC_DC.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <InfoIcon color="action" />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '0 170px 20px 170px' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
            label="Type"
            defaultValue="Anything"
          />

          <Fab size="small">
            <Iconify icon="mingcute:add-line" width={25} onClick={clickPopover.onOpen} />
          </Fab>

          <Popover
            open={Boolean(clickPopover.open)}
            anchorEl={clickPopover.open}
            onClose={clickPopover.onClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <CbAddMenu />
          </Popover>
        </Box>
        <Box display="flex" sx={{ width: '25vw' }} justifyContent="space-between">
          <TextField
            variant="outlined"
            select
            sx={{ width: '15vw' }}
            label="Motor Voltage"
            value={motor_Voltage}
            onChange={handleChange_Motor_Voltage}
          >
            {Motor_Voltage.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              select
              sx={{ width: '5vw', margin: '0 10px 0 0' }}
              label="AC/DC"
              value={motor_ac_dc}
              onChange={handleChange_Motor_AC_DC}
            >
              {Motor_AC_DC.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <InfoIcon color="action" />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '0 170px 20px 170px' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
            label="CB Identification"
            defaultValue="Anything"
            onChange={maxInputLength20}
          />
          <InfoIcon color="action" />
        </Box>
        <Box display="flex" sx={{ width: '25vw' }} justifyContent="space-between">
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
              label="Gas Pressure"
              defaultValue="NULL"
              onChange={maxInputLength10}
            />
            <InfoIcon color="action" />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '0 170px 20px 170px' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
            label="Bay"
            defaultValue="1"
            onChange={maxInputLength20}
          />
          <InfoIcon color="action" />
        </Box>
        <Box display="flex" sx={{ width: '25vw' }} justifyContent="space-between">
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
              label="Air Pressure"
              defaultValue="NULL"
              onChange={maxInputLength10}
            />
            <InfoIcon color="action" />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '0 170px 20px 170px' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
            label="Substation Location"
            defaultValue="Pune"
            onChange={maxInputLength20}
          />
          <InfoIcon color="action" />
        </Box>
        <Box display="flex" sx={{ width: '25vw' }} justifyContent="space-between">
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
              label="Year Of Manufacturing"
              defaultValue="2023"
              onChange={handleSpecialCharMaxLimit}
            >
              {Motor_AC_DC.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <InfoIcon color="action" />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ margin: '0 170px 20px 170px' }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="outlined"
            sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
            label="Tested By / Employee ID"
            defaultValue="12345"
            onChange={maxInputLength20}
          />
          <InfoIcon color="action" />
        </Box>
        <Box display="flex" sx={{ width: '25vw' }} justifyContent="space-between">
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              sx={{ width: '22.5vw', margin: '0 10px 0 0' }}
              label="Add New Field"
              defaultValue="Anything"
            />
            <InfoIcon color="action" />
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" width="80vw">
        <Button variant="contained" color="primary" sx={{ margin: '20px 25px 0 0' }}>
          Save
        </Button>
        <Button variant="outlined" color="primary" sx={{ margin: '20px 35px 0 0' }}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default CBSettings;
