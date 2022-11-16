import React from 'react';

import Discount from './discount';

const OnDiscount = () => {
  return (
    <div className="flex flex-col justify-center items-start my-5">
      <h1 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-800 w-full mb-3">
        On Discount
      </h1>
      <div className="flex flex-row flex-wrap justify-start items-start">
        <Discount />
      </div>
    </div>
  );
};

export default OnDiscount;
