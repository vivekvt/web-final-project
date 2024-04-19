import React from 'react';
import Layout from '../component/Layout';
import { Container, Typography } from '@mui/material';
import BreadCrumbs from '../component/BreadCrumbs';
import ProductGrid from '../component/ProductGrid';

export default function ProductsPage() {
  return (
    <Layout>
      <Container sx={{ pb: 2 }} maxWidth="md">
        <BreadCrumbs>
          <Typography>Products</Typography>
        </BreadCrumbs>
        <ProductGrid />
      </Container>
    </Layout>
  );
}
