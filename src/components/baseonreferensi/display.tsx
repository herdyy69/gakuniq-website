/* eslint-disable unused-imports/no-unused-imports */
import React from 'react';

import Referensi from './referensi';

const BaseOnReferensi = () => {
  return (
    <div className="flex flex-col justify-center items-start my-5">
      <h1 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-800 w-full mb-3">
        Based on your reference
      </h1>
      <div className="flex flex-row flex-wrap justify-start items-start">
        <Referensi />
      </div>
    </div>
  );
};

export default BaseOnReferensi;
