import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          The page you are looking for might be in another galaxy.
        </Typography>
        <Link href="/" underline="none">
          <IconButton color="primary" aria-label="Go back to home">
            <HomeIcon />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
