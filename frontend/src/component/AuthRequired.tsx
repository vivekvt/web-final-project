import React, { ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface IAuthRequired {
  children: ReactNode;
}

export default function AuthRequired({ children }: IAuthRequired) {
  const user = useSelector((state: any) => state?.user);

  if (user?.authenticated) {
    return <>{children}</>;
  }
  return (
    <Box textAlign="center" mt={2}>
      <Typography>Login is required to access this page</Typography>
      <Link to="/login">
        <Button variant="contained" sx={{ mt: 2 }} size="small">
          Login
        </Button>
      </Link>
    </Box>
  );
}
