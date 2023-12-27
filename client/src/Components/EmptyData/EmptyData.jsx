import React from 'react';
import { Box, Typography, } from '@mui/material';
import AddButton from '../AddButton/AddButton';

const EmptyData = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box sx={{ textAlign: 'center' }}>
        <AddButton size={100}/>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Nothing to see here!
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Looks like there's no data available at the moment.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Click the button above to add some data and bring this page to life!
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyData;
