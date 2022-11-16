import React from 'react';

import Product from '@/components/product/Product';

const Katalog = () => {
  return (
    <div className="flex flex-col justify-center items-start my-5">
      <div className="flex flex-row flex-wrap justify-start items-start">
        <Product />
      </div>
    </div>
  );
};

export default Katalog;
