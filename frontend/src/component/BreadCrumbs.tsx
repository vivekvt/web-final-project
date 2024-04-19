import { Home } from '@mui/icons-material';
import { Breadcrumbs, Link } from '@mui/material';
import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IBreadCrumbs {
  children: ReactNode;
}

export default function BreadCrumbs({ children }: IBreadCrumbs) {
  return (
    <Breadcrumbs sx={{ py: 1 }} aria-label="breadcrumb">
      <RouterLink to="/" style={{ color: 'inherit' }}>
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }}>
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          iKWC
        </Link>
      </RouterLink>
      {children}
    </Breadcrumbs>
  );
}
