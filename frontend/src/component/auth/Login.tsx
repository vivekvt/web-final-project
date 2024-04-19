import { Button, TextField } from '@mui/material';
import React from 'react';
import InputGroup from '../InputGroup';
import { useLogin } from '../../hooks/authHook';

export default function Login() {
  const { onSubmit, onChange, state, loading } = useLogin();

  return (
    <form onSubmit={onSubmit}>
      <InputGroup>
        <TextField
          size="small"
          fullWidth
          label="Email"
          required
          type="email"
          name="email"
          value={state.email}
          onChange={onChange}
          disabled={loading}
        />
      </InputGroup>
      <InputGroup>
        <TextField
          size="small"
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={state.password}
          onChange={onChange}
          required
          disabled={loading}
        />
      </InputGroup>
      <InputGroup>
        <Button variant="contained" fullWidth type="submit" disabled={loading}>
          Login
        </Button>
      </InputGroup>
    </form>
  );
}
