import React from 'react';
import Layout from '../component/Layout';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import Login from '../component/auth/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUp from '../component/auth/SignUp';

export default function LoginPage() {
  const auth = useSelector((state: any) => state?.user);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (auth.authenticated) {
    navigate('/');
  }
  return (
    <Layout>
      <Box display="flex" justifyContent="center" padding="50px 0px">
        <Paper sx={{ width: { sm: '500px', xs: '90%' } }} variant="outlined">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={value} onChange={handleChange}>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>
          <Box sx={{ px: 2 }}>
            {value === 1 ? <SignUp onSuccess={() => setValue(0)} /> : <Login />}
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}
