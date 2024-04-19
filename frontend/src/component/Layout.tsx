import React, { ReactNode } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import { Box } from '@mui/material';
import { useAuth } from '../hooks/authHook';
import AuthRequired from './AuthRequired';

interface ILayout {
  children: ReactNode;
  authRequired?: boolean;
}

export default function Layout({ children, authRequired }: ILayout) {
  useAuth();
  return (
    <div>
      <Navbar />
      <Box sx={{ minHeight: '80vh' }}>
        {authRequired ? <AuthRequired>{children}</AuthRequired> : children}
      </Box>
      <Footer />
    </div>
  );
}
