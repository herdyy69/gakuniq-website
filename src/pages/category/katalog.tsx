/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-self-import */
/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
// import { useRouter } from 'next/router';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Katalog from '@/components/kategori/katalog';

const Catalog = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Katalog"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      <h1 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-800 w-full">
        Katalog Produk
      </h1>
      <Katalog />
    </Main>
  );
};

export default Catalog;
