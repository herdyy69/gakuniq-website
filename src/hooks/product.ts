/* eslint-disable unused-imports/no-unused-vars */
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import axios from '@/lib/axios';

export const useProduct = () => {
  const { data: products, error } = useSWR(`/api/products/`, () =>
    axios.get(`/api/products/`).then((res) => res.data)
  );
  const [product, setProduct] = useState();

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, []);
};

export default useProduct;
