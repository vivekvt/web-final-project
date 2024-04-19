import * as localforage from 'localforage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../redux/store';
import { apiInstance } from '../utils/apiInstance';

export interface IProfile {
  name: string;
  email: string;
  address: IAddress;
}
interface IAddress {
  addressLine: string;
  city: string;
  zipcode: string;
  province: string;
  country: string;
}

export const useUpdateProfile = () => {
  const user = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile>({
    name: '',
    email: '',
    address: {
      addressLine: '',
      city: '',
      zipcode: '',
      province: '',
      country: '',
    },
  });

  useEffect(() => {
    if (user?.session) {
      setProfile(user?.session);
    }
  }, [user?.session]);

  console.log({ user });

  const onChange = (event: any) => {
    const { name, value } = event?.target;
    setProfile((oldProfile) => ({ ...oldProfile, [name]: value }));
  };

  const onAddressChange = (event: any) => {
    const { name, value } = event?.target;
    setProfile((oldProfile) => ({
      ...oldProfile,
      address: { ...oldProfile?.address, [name]: value },
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        address: profile.address,
        name: profile.name,
      };
      const { data } = await apiInstance.put(
        `/api/v1/users/${user?.session?._id}`,
        payload
      );
      dispatch(setSession(data?.data));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(`Error ${error.message}`);
    }
  };

  return { loading, onChange, profile, onAddressChange, onSubmit };
};

export const getUserDetails = async (accessToken: string) => {
  try {
    const { data } = await apiInstance.get(`/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data?.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
