import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

interface QuantityInput {
  value: number;
  onChange: (newValue: number) => void;
}

export default function QuantityInput({ value, onChange }: QuantityInput) {
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        color="primary"
        size="small"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <RemoveCircle fontSize="small" />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton
        color="primary"
        size="small"
        onClick={() => onChange(value + 1)}
      >
        <AddCircle fontSize="small" />
      </IconButton>
    </Box>
  );
}
