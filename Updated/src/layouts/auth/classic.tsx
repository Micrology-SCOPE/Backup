// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// auth
// import { useAuthContext } from 'src/auth/hooks';
// routes
// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
import LoginHeader from '../dashboard/login-header';

// components

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  // const { method } = useAuthContext();

  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'Hi, Welcome back'}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{ maxWidth: 720 }}
      />
    </Stack>
  );

  return (
    <>
      <LoginHeader />
      <Stack
        component="main"
        direction="row"
        sx={{
          minHeight: '100vh',
        }}
      >
        {upMd && renderSection}

        {renderContent}
      </Stack>
      {/* <Footer /> */}
    </>
  );
}
