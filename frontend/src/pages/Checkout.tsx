import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import Cards from 'react-credit-cards-2';
import React from 'react';
import InputGroup from '../component/InputGroup';
import { useCheckout } from '../hooks/checkout';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function Checkout({ show, onClose }: any) {
  const {
    order,
    onChange,
    onAddressChange,
    onSubmit,
    loading,
    onCreditCardChange,
    focus,
    setFocus,
  } = useCheckout();
  return (
    <Dialog
      fullWidth
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Your order has been placed successfully
      </DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <TextField
              name="name"
              label="Name"
              fullWidth
              size="small"
              disabled={loading}
              required
              value={order?.name}
              onChange={onChange}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              name="email"
              label="Email"
              fullWidth
              size="small"
              required
              disabled={loading}
              value={order?.email}
              onChange={onChange}
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
              value={order?.address?.addressLine}
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
                  value={order?.address?.city}
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
                  value={order?.address?.zipcode}
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
                  value={order?.address?.province}
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
                  value={order?.address?.country}
                  onChange={onAddressChange}
                />
              </Grid>
            </Grid>
          </InputGroup>
          <FormLabel>Credit Card</FormLabel>
          <InputGroup>
            <Cards
              number={order?.creditCard.number}
              expiry={order?.creditCard.expiry}
              cvc={order?.creditCard.cvc}
              name={order?.creditCard.name}
              //@ts-ignore
              focused={focus}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              name="number"
              label="Credit Card Number"
              fullWidth
              size="small"
              disabled={loading}
              required
              value={order?.creditCard?.number}
              onChange={onCreditCardChange}
              onFocus={() => setFocus('number')}
            />
          </InputGroup>
          <InputGroup>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="expiry"
                  label="Expiry"
                  fullWidth
                  size="small"
                  disabled={loading}
                  required
                  value={order?.creditCard?.expiry}
                  onChange={onCreditCardChange}
                  onFocus={() => setFocus('expiry')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="cvc"
                  label="Cvc"
                  fullWidth
                  size="small"
                  disabled={loading}
                  required
                  value={order?.creditCard?.cvc}
                  onChange={onCreditCardChange}
                  onFocus={() => setFocus('cvc')}
                />
              </Grid>
            </Grid>
          </InputGroup>
          <InputGroup>
            <TextField
              name="name"
              label="Name on Card"
              fullWidth
              size="small"
              disabled={loading}
              required
              value={order?.creditCard?.name}
              onChange={onCreditCardChange}
              onFocus={() => setFocus('name')}
            />
          </InputGroup>
          <InputGroup>
            <Button
              disabled={loading}
              size="small"
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            <Button onClick={onClose} sx={{ ml: 4 }} size="small">
              Close
            </Button>
          </InputGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
