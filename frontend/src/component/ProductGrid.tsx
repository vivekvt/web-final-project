import React from 'react';
import { useGetProducts } from '../hooks/products';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';
import { appConfig } from '../data/appConfig';

interface IProductGrid {
  showHeader?: boolean;
  headerTitle?: string;
  category?: string;
  limit?: number;
}

export default function ProductGrid({
  showHeader,
  headerTitle = 'All Products',
  category,
  limit,
}: IProductGrid) {
  const products = useGetProducts(category, limit);
  return (
    <Box>
      {showHeader && (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{headerTitle}</Typography>
          <Link to="/products">
            <Button endIcon={<ChevronRight />}>View All</Button>
          </Link>
        </Box>
      )}
      <Grid container spacing={2}>
        {products?.map((product, index) => (
          <Grid xs={6} sm={4} md={3} key={index} item>
            <Link to={`/products/${product?._id}`}>
              <Card variant="outlined" sx={{ px: 2, pt: 2, pb: 1 }}>
                <Box>
                  <img
                    src={`${appConfig.apiUrl}${product?.image}`}
                    style={{ width: '100%' }}
                  />
                </Box>
                <Typography textAlign="center" noWrap>
                  {product?.title}
                </Typography>
                <Typography textAlign="center" noWrap>
                  <Typography variant="caption" display="inline">
                    <del>
                      $
                      {Number(product?.price) +
                        Number((product?.price * 0.1).toFixed())}
                    </del>
                  </Typography>
                  <Typography
                    mx={1}
                    display="inline"
                    fontWeight="bold"
                    color="green"
                  >
                    ${product?.price}
                  </Typography>
                  <Typography variant="caption" display="inline">
                    -10%
                  </Typography>
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
