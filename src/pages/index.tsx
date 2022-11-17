/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable unused-imports/no-unused-vars */
// import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Referensi from '@/components/baseonreferensi/display';
import OnDiscount from '@/components/onpromo/OnDiscount';
import Swipers from '@/components/swiper/Swipers';
import { Meta } from '@/layouts/Meta';
import axios from '@/lib/axios';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [user, setUser] = useState();
  const getProfiles = async () => {
    await axios
      .get('/api/user')
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Gakunique"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      <Swipers />
      <OnDiscount />
      {user && <Referensi />}
    </Main>
  );
};

export default Index;
