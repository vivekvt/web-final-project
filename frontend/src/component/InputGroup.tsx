import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface IInputGroup {
  children: ReactNode;
}

export default function InputGroup({ children }: IInputGroup) {
  return <Box sx={{ mt: 2, mb: 2 }}>{children}</Box>;
}
