import { Apple } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Box
      sx={{ backgroundColor: '#293A4F', pt: 8, pb: 2, textAlign: 'center' }}
      color={'Background'}
    >
      <Box
        display="flex"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Apple sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          iKWC
        </Typography>
      </Box>
      <Typography variant="caption">
        Copyright © 2024 iKWC | Made by Vivek Thakur
      </Typography>
    </Box>
  );
}
