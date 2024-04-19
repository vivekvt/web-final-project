import { useEffect, useState } from 'react';
import { IProduct } from '../data/products';
import * as localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../redux/store';
import { apiInstance } from '../utils/apiInstance';
import { useNavigate } from 'react-router-dom';

export interface ICart {
  product: IProduct;
  quantity: number;
}

export const useAddToCart = (product: IProduct | null) => {
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart: ICart[] = useSelector((state: any) => state?.user?.cart) || [];
  const user = useSelector((state: any) => state?.user?.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (product?._id) {
      const selectedCartItem = cart?.some(
        (cartItem: any) => cartItem?.product?._id == product?._id
      );
      if (selectedCartItem) {
        setAlreadyInCart(true);
      } else {
        setAlreadyInCart(false);
      }
    }
  }, [product?._id, cart]);

  const addToCart = async () => {
    try {
      if (!user?._id) {
        return navigate('/login');
      } else if (!alreadyInCart) {
        const newCart: any = [...(cart || []), { product, quantity }];
        dispatch(updateCart(newCart));
        saveCartToDatabase(newCart);
      }
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  return { alreadyInCart, addToCart, quantity, setQuantity };
};

export const useUpdateCart = () => {
  const dispatch = useDispatch();
  const cart: ICart[] = useSelector((state: any) => state?.user?.cart) || [];

  const saveCart = async (newCart: ICart[]) => {
    try {
      dispatch(updateCart(newCart));
      saveCartToDatabase(newCart);
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  const changeQuantity = async (productId: string, newQuantity: number) => {
    try {
      const newCart = cart?.map((cartItem) =>
        cartItem?.product?._id == productId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      await saveCart(newCart);
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      debugger;
      const newCart = cart?.filter(
        (cartItem) => cartItem?.product?._id != productId
      );
      await saveCart(newCart);
    } catch (error: any) {
      alert(`error ${error.message}`);
    }
  };
  return { changeQuantity, removeProduct };
};

export const calculateCartTotal = (cart: ICart[]) => {
  let total = 0;
  cart?.forEach((cartItem) => {
    total += cartItem?.product?.price * cartItem?.quantity;
  });
  return total;
};

const saveCartToDatabase = async (cartItemPayload: ICart[]) => {
  try {
    const user = await localforage.getItem('authSession');
    const payload = { items: cartItemPayload, user };
    const { data } = await apiInstance.put('/api/v1/carts/user', payload);
  } catch (error: any) {
    alert(`Error: ${error?.response?.data?.message || error?.message}`);
    console.log(error);
  }
};

export const getUserCartFromDB = async () => {
  const newCart: ICart[] = [];
  try {
    const user: any = await localforage.getItem('authSession');
    const { data } = await apiInstance.get(`/api/v1/carts/user/${user?._id}`);
    if (data?.cart?.length > 0) {
      return data?.cart;
    }
    return newCart;
  } catch (error: any) {
    // alert(`Error: ${error?.response?.data?.message || error?.message}`);
    console.log(error);
    return newCart;
  }
};
