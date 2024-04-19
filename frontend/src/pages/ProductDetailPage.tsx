import React from 'react';
import Layout from '../component/Layout';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import BreadCrumbs from '../component/BreadCrumbs';
import { useGetProductById } from '../hooks/products';
import { ShoppingCart } from '@mui/icons-material';
import { useAddToCart } from '../hooks/cart';
import InputGroup from '../component/InputGroup';
import QuantityInput from '../component/QuantityInput';
import ProductGrid from '../component/ProductGrid';
import { appConfig } from '../data/appConfig';

export default function ProductDetailPage() {
  let { productId } = useParams();
  const product = useGetProductById(productId);
  const { addToCart, alreadyInCart, quantity, setQuantity } =
    useAddToCart(product);

  return (
    <Layout>
      <Container maxWidth="md">
        <BreadCrumbs>
          <Link to="/products">
            <Typography>Products</Typography>
          </Link>
          <Typography>{product?.title || productId}</Typography>
        </BreadCrumbs>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box>
                <img
                  src={`${appConfig.apiUrl}/${product?.image}`}
                  width="100%"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5">{product?.title}</Typography>
              <Typography noWrap>
                <Typography variant="caption" display="inline">
                  <del>
                    $
                    {Number(product?.price) +
                      Number(((product?.price || 0) * 0.1).toFixed())}
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
              <InputGroup>
                {alreadyInCart ? (
                  <Link to="/cart">
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      startIcon={<ShoppingCart />}
                    >
                      Go to Cart
                    </Button>
                  </Link>
                ) : (
                  <>
                    <QuantityInput value={quantity} onChange={setQuantity} />
                    <Button
                      sx={{ mt: 1 }}
                      onClick={addToCart}
                      size="small"
                      variant="contained"
                      startIcon={<ShoppingCart />}
                    >
                      Add To Card
                    </Button>
                  </>
                )}
              </InputGroup>
              <Typography>{product?.description}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Box my={1}>
          <ProductGrid
            showHeader
            headerTitle="Similar Products"
            category={product?.category?.[0]}
            limit={4}
          />
        </Box>
      </Container>
    </Layout>
  );
}
