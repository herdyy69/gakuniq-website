/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable unused-imports/no-unused-vars */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useState } from 'react';

const Preloader: FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const token = Cookies.get('token');
  const [loading, setLoading] = useState(true);

  return (
    <div className="preloader">
      <div className="preloader__inner">
        <div className="preloader__image">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="preloader__text">Loading...</div>
      </div>
    </div>
  );
};

export default Preloader;
