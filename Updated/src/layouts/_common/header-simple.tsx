// @mui
// import { useTheme } from '@mui/material/styles';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// theme
// import { bgBlur } from 'src/theme/css';
// routes
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
// components
// import { RouterLink } from 'src/routes/components';
//
import { HEADER } from '../config-layout';
import HeaderShadow from './header-shadow';
// import SettingsButton from './settings-button';

// ----------------------------------------------------------------------

export default function HeaderSimple() {
  // const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return <AppBar>{offsetTop && <HeaderShadow />}</AppBar>;
}
