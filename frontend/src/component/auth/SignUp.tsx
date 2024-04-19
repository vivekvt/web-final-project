import { Button, TextField } from '@mui/material';
import React from 'react';
import InputGroup from '../InputGroup';
import { useSignUp } from '../../hooks/authHook';

export default function SignUp({ onSuccess }: { onSuccess: () => void }) {
  const { onSubmit, onChange, state, loading } = useSignUp(onSuccess);

  return (
    <form onSubmit={onSubmit}>
      <InputGroup>
        <TextField
          size="small"
          fullWidth
          label="Name"
          required
          type="text"
          name="name"
          value={state.name}
          onChange={onChange}
          disabled={loading}
        />
      </InputGroup>
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
          Sign Up
        </Button>
      </InputGroup>
    </form>
  );
}
