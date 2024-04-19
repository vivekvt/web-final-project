import * as localforage from 'localforage';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSession, updateCart } from '../redux/store';
import { apiInstance } from '../utils/apiInstance';
import { getUserCartFromDB } from './cart';
import { getUserDetails } from './profile';

export const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localforage.getItem('accessToken').then(function (accessToken: any) {
      if (accessToken) {
        getUser(accessToken);
      }
    });
  }, []);

  const getUser = (accessToken: string) => {
    getUserDetails(accessToken)
      .then((user) => {
        dispatch(setSession(user));
        getCart();
      })
      .catch(() => {});
  };
  const getCart = () => {
    getUserCartFromDB()
      .then((data) => {
        dispatch(updateCart(data));
      })
      .catch((error) => {});
  };
};

const initialLoginState = { email: '', password: '' };
export const useLogin = (onSuccess?: () => void) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialLoginState);
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const { data } = await apiInstance.post('/api/v1/users/login', state);
      alert('Login Success');
      setLoading(false);
      const user = data?.user;
      localforage.setItem('authSession', user);
      localforage.setItem('accessToken', data?.token);
      dispatch(setSession(user));
    } catch (error: any) {
      setLoading(false);
      alert(`Error: ${error?.response?.data?.message || error?.message}`);
      console.log(error);
    }
  };

  return { onSubmit, onChange, state, loading };
};

const initialSignUpState = {
  name: '',
  email: '',
  password: '',
  address: {
    addressLine: '',
    city: '',
    zipcode: '',
    province: '',
    country: '',
  },
};
export const useSignUp = (onSuccess: () => void) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialSignUpState);
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const { data } = await apiInstance.post('/api/v1/users/signup', state);
      alert('Sign Up Success');
      setLoading(false);
      onSuccess();
    } catch (error: any) {
      setLoading(false);
      alert(`Error: ${error?.response?.data?.message || error?.message}`);
      console.log(error);
    }
  };
  return { onSubmit, onChange, state, loading };
};
