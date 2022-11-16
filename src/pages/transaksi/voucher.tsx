/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-self-import */
/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const VoucherTransaksi = () => {
  const router = useRouter();
  const MethodPayment = [
    { id: 1, value: 'gakuniq wallet', label: 'GAKUNIQ WALLET', saldo: 1000000 },
    { id: 2, value: 'BRI', label: 'BRI' },
    { id: 3, value: 'BCA', label: 'BCA' },
    { id: 4, value: 'BCIH', label: 'BCIH' },
  ];

  const [selectedPayment, setSelectedPayment] = useState('gakuniq wallet');

  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Checkout..."
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      <div className="flex flex-row items-center justify-start w-full h-full">
        <div className="flex flex-col items-start justify-start p-4 bg-slate-500 w-[50vw] h-auto rounded-md text-slate-100">
          <h1 className="text-2xl font-bold border-b-2 border-slate-100 w-full mb-4">
            Ringkasan Belanja
          </h1>
          <div className="flex flex-row items-center justify-between bg-slate-600 w-full min-h-[4rem] rounded-md mb-1 py-3 px-2">
            <div className="flex flex-row items-center justify-start">
              <div className="flex flex-col items-start justify-center ml-2">
                <h1 className="sm:text-sm text-xs font-medium text-slate-50">
                  Name Voucher
                </h1>
                <h3 className="sm:text-xs text-[11px] font-medium text-slate-50">
                  Rp 100.000 - 10 %
                </h3>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center mr-2">
              Rp 100.000
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full px-2 border-t-[1px] mt-4 pt-2">
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-xl font-medium text-slate-50">Subtotal</h1>
              <h1 className="text-xl font-medium text-slate-50">Rp 100.000</h1>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-2 border-t-[1px] pt-2">
              <h1 className="text-xl font-medium text-slate-50">Total</h1>
              <h1 className="text-xl font-medium text-slate-50">Rp 10.000</h1>
            </div>

            <div className="flex flex-row items-center justify-between w-full border-b-[2px] py-3 mt-0">
              <h1 className="text-xl font-medium text-slate-50">Pembayaran</h1>
              <div className="flex flex-row items-center justify-center">
                {MethodPayment.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPayment(item.value)}
                    className={`${
                      selectedPayment === item.value
                        ? 'bg-slate-400 text-slate-800'
                        : 'bg-slate-600 text-slate-50 '
                    } rounded-md px-2 py-1 mr-2`}
                  >
                    {item.label} {item.saldo && `(${item.saldo})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full">
              <button type="button" className="btn btn-primary w-full mt-5">
                Konfirmasi Pesanan
              </button>
              <button
                onClick={() => router.back()}
                type="button"
                className="btn btn-error w-full mt-2"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-[45vw] px-2">
          <img
            src="/assets/images/logo.png"
            alt="LOGOS"
            className="w-[250px] border-2 border-slate-800 rounded-md"
          />
          {/* thank you  */}
          <div className="flex flex-col items-start justify-start px-2 border-t-[1px] mt-4 pt-2">
            <h1 className="text-xl font-medium text-slate-800">Terima Kasih</h1>
            <h1 className="text-xl font-medium text-slate-800">
              Telah Berbelanja di Toko Kami
            </h1>
            <span className="text-sm text-slate-800">~ Gakunique Store ~</span>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default VoucherTransaksi;
