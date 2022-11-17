/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-self-import */
/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Alert from '@/components/Alert';

import axios from '@/lib/axios';
import Cookies from 'js-cookie';

const VoucherTransaksi = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [params, setParams] = useState(router.query);

  const [voucher, setVoucher] = useState([]);
  const [user, setUser] = useState([]);

  const getData = async () => {
    await axios
      .get(`/api/voucher/${params.id}`)
      .then((res) => {
        setVoucher(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`/api/user`)
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const MethodPayment = [
    { id: 1, value: 'gakuniq wallet', label: 'GAKUNIQ WALLET', saldo: 1000000 },
    { id: 2, value: 'BRI', label: 'BRI' },
    { id: 3, value: 'BCA', label: 'BCA' },
    { id: 4, value: 'CIMB NIAGA', label: 'CIMB NIAGA' },
  ];
  const [selectedPayment, setSelectedPayment] = useState('gakuniq wallet');
  const checkout = () => {
    axios
      .post(`/api/voucher_user/create`, {
        metode_pembayaran: selectedPayment,
        voucher_id: voucher.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

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
                  {voucher?.kode_voucher}
                </h1>
                <h3 className="sm:text-xs text-[11px] font-medium text-slate-50">
                  Rp{' '}
                  {voucher?.harga
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </h3>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center mr-2">
              {voucher?.waktu_berakhir}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full px-2 border-t-[1px] mt-4 pt-2">
            <div className="flex flex-row items-center justify-between w-full mt-2 border-t-[1px] pt-2">
              <h1 className="text-xl font-medium text-slate-50">Total</h1>
              <h1 className="text-xl font-medium text-slate-50">
                Rp{' '}
                {voucher?.harga
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </h1>
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
                    } rounded-md px-2 py-1 mr-2 text-sm font-medium`}
                  >
                    {item.label} {item.saldo && `(${item.saldo})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full">
              <button
                onClick={(e) => {
                  if (setSelectedPayment === 'gakuniq wallet') {
                    if (user.saldo < voucher.harga) {
                      alert('Saldo GAKUNIQ WALLET anda tidak mencukup');
                    } else {
                      checkout() && e.preventDefault();
                      setTimeout(() => {
                        router.push({
                          pathname: '/my-account/profiles',
                        });
                      }, 1000);
                    }
                  } else {
                    checkout() && e.preventDefault();
                    setTimeout(() => {
                      router.push({
                        pathname: '/my-account/profiles',
                      });
                    }, 1000);
                  }
                }}
                type="button"
                className="btn btn-primary w-full mt-5"
              >
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
