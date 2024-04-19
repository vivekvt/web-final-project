import * as localforage from 'localforage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../redux/store';
import { apiInstance } from '../utils/apiInstance';

export interface IOrder {
  name: string;
  email: string;
  address: IAddress;
  creditCard: ICreditCard;
}
interface IAddress {
  addressLine: string;
  city: string;
  zipcode: string;
  province: string;
  country: string;
}
interface ICreditCard {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

export const useCheckout = () => {
  const user = useSelector((state: any) => state?.user);

  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState('');
  const [order, setOrder] = useState<IOrder>({
    name: '',
    email: '',
    address: {
      addressLine: '',
      city: '',
      zipcode: '',
      province: '',
      country: '',
    },
    creditCard: {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
    },
  });

  useEffect(() => {
    if (user?.session) {
      setOrder((oldOrder) => ({
        ...oldOrder,
        name: user?.session?.name,
        email: user?.session?.email,
        address: { ...order?.address, ...user?.session?.address },
      }));
    }
  }, [user?.session]);

  const onChange = (event: any) => {
    const { name, value } = event?.target;
    setOrder((oldProfile) => ({ ...oldProfile, [name]: value }));
  };

  const onAddressChange = (event: any) => {
    const { name, value } = event?.target;
    setOrder((oldProfile) => ({
      ...oldProfile,
      address: { ...oldProfile?.address, [name]: value },
    }));
  };
  const onCreditCardChange = (event: any) => {
    const { name, value } = event?.target;
    setOrder((oldProfile) => ({
      ...oldProfile,
      creditCard: { ...oldProfile?.creditCard, [name]: value },
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user: any = await localforage.getItem('authSession');
      const payload = { ...order, user: user?._id, item: user?.cart };
      const { data } = await apiInstance.post('/api/v1/orders', payload);
      setLoading(false);
      alert('Order Placed Successfully');
      // @ts-ignore
      window.location = '/';
    } catch (error: any) {
      setLoading(false);
      alert(`Error: ${error?.response?.data?.message || error?.message}`);
      console.log(error);
    }
  };

  return {
    loading,
    onChange,
    order,
    onAddressChange,
    onSubmit,
    onCreditCardChange,
    focus,
    setFocus,
  };
};
