import React from 'react';
import Layout from '../component/Layout';
import {
  Button,
  Container,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import BreadCrumbs from '../component/BreadCrumbs';
import InputGroup from '../component/InputGroup';
import { useUpdateProfile } from '../hooks/profile';
import Loading from '../component/Loading';

export default function ProfilePage() {
  const { profile, onChange, onAddressChange, onSubmit, loading } =
    useUpdateProfile();
  return (
    <Layout authRequired>
      <Container maxWidth="md">
        <BreadCrumbs>
          <Typography>Profile</Typography>
        </BreadCrumbs>
        <Paper variant="outlined" sx={{ px: 2 }}>
          {!profile?.email ? (
            <Loading />
          ) : (
            <form onSubmit={onSubmit}>
              <InputGroup>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  size="small"
                  disabled={loading}
                  required
                  value={profile?.name}
                  onChange={onChange}
                />
              </InputGroup>
              <InputGroup>
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  size="small"
                  disabled
                  required
                  value={profile?.email}
                />
              </InputGroup>
              <FormLabel>Shipping Address</FormLabel>
              <InputGroup>
                <TextField
                  name="addressLine"
                  label="Address Line"
                  fullWidth
                  size="small"
                  disabled={loading}
                  required
                  value={profile?.address?.addressLine}
                  onChange={onAddressChange}
                />
              </InputGroup>
              <InputGroup>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="city"
                      label="City"
                      fullWidth
                      size="small"
                      disabled={loading}
                      required
                      value={profile?.address?.city}
                      onChange={onAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="zipcode"
                      label="Zipcode"
                      fullWidth
                      size="small"
                      disabled={loading}
                      required
                      value={profile?.address?.zipcode}
                      onChange={onAddressChange}
                    />
                  </Grid>
                </Grid>
              </InputGroup>
              <InputGroup>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="province"
                      label="Province"
                      size="small"
                      disabled={loading}
                      fullWidth
                      required
                      value={profile?.address?.province}
                      onChange={onAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="country"
                      label="Country"
                      size="small"
                      disabled={loading}
                      fullWidth
                      required
                      value={profile?.address?.country}
                      onChange={onAddressChange}
                    />
                  </Grid>
                </Grid>
              </InputGroup>
              <InputGroup>
                <Button size="small" variant="contained" type="submit">
                  Update
                </Button>
              </InputGroup>
            </form>
          )}
        </Paper>
      </Container>
    </Layout>
  );
}
