import { useEffect, useState } from 'react';
import { IProduct } from '../data/products';
import { apiInstance } from '../utils/apiInstance';

export const useGetProducts = (category?: string, limit?: number) => {
  const [products, setProduct] = useState<IProduct[] | []>([]);

  useEffect(() => {
    // let newProducts: any = productsData;
    // if (category) {
    //   newProducts = productsData?.filter((p) =>
    //     p?.category?.includes(category)
    //   );
    // }
    // if (limit) {
    //   newProducts = newProducts?.slice(0, limit);
    // }
    // setProduct(newProducts);
    getProduct();
  }, [category, limit]);

  const getProduct = async () => {
    try {
      const { data } = await apiInstance.get<{ data: IProduct[] }>(
        '/api/v1/products'
      );

      let newProducts = data?.data;
      if (category) {
        newProducts = newProducts?.filter((p) =>
          p?.category?.includes(category)
        );
      }
      if (limit) {
        newProducts = newProducts?.slice(0, limit);
      }
      setProduct(newProducts);
    } catch (error) {
      //
    }
  };

  return products;
};

export const useGetProductById = (id?: string) => {
  const [product, setProduct] = useState<IProduct | null>(null);

  const getProduct = async () => {
    try {
      const { data } = await apiInstance.get<{ data: IProduct }>(
        `/api/v1/products/${id}`
      );
      setProduct(data?.data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  return product;
};
