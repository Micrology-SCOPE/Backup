// @mui
// import { useTheme } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// theme
// import { bgBlur } from 'src/theme/css';
// hooks
// import { useOffSetTop } from 'src/hooks/use-off-set-top';
// import { useResponsive } from 'src/hooks/use-responsive';
// components
// import Logo from 'src/components/logo';
// import SvgColor from 'src/components/svg-color';
// import { useSettingsContext } from 'src/components/settings';
import Stack from '@mui/material/Stack';
//
// import { HEADER, NAV } from '../config-layout';
import {
  // Searchbar,
  // AccountPopover,
  BrandName,
  SerialNumber,
  BankingButton,
  InformationButton,
  SettingsButton,
  // LanguagePopover,
  // ContactsPopover,
  // NotificationsPopover,
} from '../_common';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function NavHeader({ onOpenNav }: Props) {
  // const theme = useTheme();

  // const settings = useSettingsContext();

  // const isNavHorizontal = settings.themeLayout === 'horizontal';

  // const isNavMini = settings.themeLayout === 'mini';

  // const lgUp = useResponsive('up', 'lg');

  // const offset = useOffSetTop(HEADER.H_DESKTOP);

  // const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        // flexGrow: 1,
        position: 'sticky',
        top: 0,
        padding: '5px 30px',
        // paddingRight: { xs: 1, sm: 2 }, // Add some padding to the right side
      }}
    >
      <BrandName />

      <Stack direction="row" spacing={1} alignItems="center">
        <SerialNumber />
        <BankingButton />
        <InformationButton />
        <SettingsButton />
      </Stack>
    </Stack>
  );

  return (
    <AppBar
    // sx={{
    //   height: HEADER.H_MOBILE,
    //   zIndex: theme.zIndex.appBar + 1,
    //   ...bgBlur({
    //     color: theme.palette.background.default,
    //   }),
    //   transition: theme.transitions.create(['height'], {
    //     duration: theme.transitions.duration.shorter,
    //   }),
    //   ...(lgUp && {
    //     // width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
    //     height: HEADER.H_DESKTOP,
    //     ...(offsetTop && {
    //       height: HEADER.H_DESKTOP_OFFSET,
    //     }),
    //     ...(isNavHorizontal && {
    //       width: 1,
    //       bgcolor: 'background.default',
    //       height: HEADER.H_DESKTOP_OFFSET,
    //       borderBottom: `dashed 1px ${theme.palette.divider}`,
    //     }),
    //     ...(isNavMini && {
    //       width: `calc(100% - ${NAV.W_MINI + 1}px)`,
    //     }),
    //   }),
    // }}
    >
      {/* <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
      </Toolbar> */}
      {renderContent}
    </AppBar>
  );
}