import React from 'react';
import Layout from '../component/Layout';
import {
  Box,
  Button,
  Chip,
  Container,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ProductGrid from '../component/ProductGrid';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* <Tabs
        // value={value}
        onChange={() => navigate('/products')}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Iphone" />
        <Tab label="Mac" />
        <Tab label="Ipad" />
        <Tab label="Watch" />
        <Tab label="Airpods" />
        <Tab label="Accessories" />
        <Tab label="TV & Home" />
      </Tabs> */}
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: '#000000',
            // height: '200px',
            // height: 'calc(100vh - 90px)',
            minHeight: '350px',
          }}
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <Box>
            <Box sx={{ width: { xs: '200px', sm: '300px' } }}>
              <img src="/apple-vision-pro.png" style={{ width: '100%' }} />
            </Box>
            <Chip label="New" color="success" size="small" />
            <Typography color="Background" variant="h6" sx={{ my: 1 }}>
              Apple Vision Pro
            </Typography>
            <Link to="/products">
              <Button variant="contained" size="small">
                Buy Now
              </Button>
            </Link>
          </Box>
        </Box>{' '}
      </Container>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <ProductGrid showHeader headerTitle="New Launch" limit={4} />
        <Box sx={{ my: 2 }}>
          <ProductGrid
            showHeader
            headerTitle="Airpods"
            category="airpods"
            limit={4}
          />
        </Box>
        <ProductGrid
          showHeader
          headerTitle="Newly Launched Mac"
          category="mac"
          limit={4}
        />
      </Container>
    </Layout>
  );
}
