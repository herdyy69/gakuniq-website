/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-self-import */
/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
// import { useRouter } from 'next/router';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Pria from '@/components/kategori/pria';

const pria = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Pria"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      <h1 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-800 w-full">
        MENS
      </h1>
      <div className="flex flex-col items-start">
        <img
          src="https://cdn.pixabay.com/photo/2022/03/02/17/25/mannequins-7043615_960_720.jpg"
          alt="PRIA"
          className="max-h-[400px] w-full object-cover"
        />
      </div>
      <Pria />
    </Main>
  );
};

export default pria;
