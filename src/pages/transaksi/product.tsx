/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
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

const Transaksi = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [voucher, setVoucher] = useState();
  const [vouchers, setVouchers] = useState();
  const [params, setParams] = useState(router.query.id);
  const [confirmation, setConfirmation] = useState();

  const getData = async () => {
    await axios
      .get('/api/user')
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        setErr(err);
      });
    await axios
      .get('/api/keranjang')
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get('/api/voucher')
      .then((res) => {
        setVoucher(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(voucher);

  useEffect(() => {
    getData();
  }, []);
  const paramArr = params;
  const filteredData =
    cart?.filter((item) => {
      return paramArr?.includes(item.id.toString());
    }) || [];

  const totalPrice = filteredData.reduce(
    (acc, item) => item.total_harga + acc,
    0
  );
  const voucherDiscount = voucher?.filter((item) => {
    return item.kode_voucher === vouchers;
  });

  const totalDiscount = voucherDiscount?.reduce(
    (acc, item) => item.diskon + acc,
    0
  );
  const discount = (totalDiscount / 100) * totalPrice;
  const total = totalPrice - discount;

  const [metode_pembayaran, setMetode_pembayaran] = useState('gakuniq wallet');
  const [waktu_pemesanan, setWaktu_pemesanan] = useState(
    new Date().toISOString().slice(0, 19).replace('T', ' ')
  );

  const MethodPayment = [
    {
      id: 1,
      value: 'gakuniq wallet',
      label: 'GAKUNIQ WALLET',
      saldo: user?.saldo,
    },
    { id: 2, value: 'BRI', label: 'BRI' },
    { id: 3, value: 'BCA', label: 'BCA' },
    { id: 4, value: 'CIMB NIAGA', label: 'CIMB NIAGA' },
  ];

  const [selectedPayment, setSelectedPayment] = useState('gakuniq wallet');
  // console.log(selectedPayment);

  const Checkout = () => {
    filteredData.map((item) => {
      axios
        .post('/api/transaksi/create', {
          keranjang_id: item.id,
          voucher_id: voucherDiscount[0]?.id,
          metode_pembayaran: selectedPayment,
          waktu_pemesanan,
        })
        .then((res) => {
          setConfirmation('Berhasil melakukan checkout');
          setTimeout(() => {
            router.push('/my-account/profiles');
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  if (confirmation) {
    setTimeout(() => {
      setConfirmation('');
    }, 3000);
  }
  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Checkout..."
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      {confirmation ? (
        <Alert alert={confirmation} close={() => setConfirmation('')} />
      ) : (
        ''
      )}
      <div className="flex flex-row items-center justify-start w-full h-full">
        <div className="flex flex-col items-start justify-start p-4 bg-slate-500 w-[50vw] h-auto rounded-md text-slate-100">
          <h1 className="text-2xl font-bold border-b-2 border-slate-100 w-full mb-4">
            Ringkasan Belanja
          </h1>
          {filteredData?.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between bg-slate-600 w-full min-h-[4rem] rounded-md mb-1 py-3 px-2"
            >
              <div className="flex flex-row items-center justify-start">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item?.produk.gambar_produk1}`}
                  alt="gambar"
                  className="h-16 w-16 rounded-md"
                />
                <div className="flex flex-col items-start justify-center ml-2">
                  <h1 className="sm:text-sm text-xs font-medium text-slate-50">
                    {item.produk.nama_produk}
                  </h1>
                  <h3 className="sm:text-xs text-[11px] font-medium text-slate-50">
                    New, {item.ukuran}, {item.warna}
                  </h3>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center mr-2">
                {item.jumlah} x Rp{''}
                {item.total_harga
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-start justify-start w-full px-2 border-t-[1px] mt-4 pt-2">
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-xl font-medium text-slate-50">Subtotal</h1>
              <h1 className="text-xl font-medium text-slate-50">
                {' '}
                Rp{' '}
                {totalPrice
                  ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  : ''}
              </h1>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-2">
              <h1 className="text-xl font-medium text-slate-50">Diskon</h1>
              <h1 className="text-xl font-medium text-slate-50">
                {' '}
                Rp {discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} (
                {totalDiscount}%)
              </h1>
            </div>
            <div className="flex flex-row items-center justify-between w-full mt-2 border-t-[1px] pt-2">
              <h1 className="text-xl font-medium text-slate-50">Total</h1>
              <h1 className="text-xl font-medium text-slate-50">
                Rp{'  '}
                {total
                  ? total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  : ''}
              </h1>
            </div>
            <div className="flex flex-row items-center justify-between w-full border-t-[2px] py-3 mt-5">
              <h1 className="text-xl font-medium text-slate-50">Voucher</h1>
              <div className="flex flex-row items-center justify-center">
                <select
                  className="input-md bg-slate-50 text-slate-800"
                  value={vouchers}
                  onChange={(e) => setVouchers(e.target.value)}
                >
                  <option value="0">Tidak ada</option>
                  {/* filter berdasarkan harga terendah */}
                  {voucher
                    ?.sort((a, b) => a.diskon - b.diskon)
                    .map((option, i) => (
                      <option key={i} value={option.kode_voucher}>
                        {option.kode_voucher} ( {option.diskon}% )
                      </option>
                    ))}
                </select>
              </div>
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
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full border-b-[2px] py-3 mt-0">
              <h1 className="text-xl font-medium text-slate-50 border-b-[1px] pb-2 mb-2">
                Alamat Tujuan
              </h1>
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-sm font-medium text-slate-50">
                  Nama Penerima
                </h1>
                <h1 className="text-sm font-medium text-slate-50">
                  {user?.nama_depan} {user?.nama_belakang}
                </h1>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-sm font-medium text-slate-50">
                  Nomor Telepon
                </h1>
                <h1 className="text-sm font-medium text-slate-50">
                  {user?.no_telepon}
                </h1>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-sm font-medium text-slate-50">
                  Label Alamat
                </h1>
                <h1 className="text-sm font-medium text-slate-50">
                  {user?.label_alamat}
                </h1>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-sm font-medium text-slate-50">
                  Kota-Kecamatan
                </h1>
                <h1 className="text-sm font-medium text-slate-50">
                  {user?.kota_kecamatan}
                </h1>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <h1 className="text-sm font-medium text-slate-50">
                  Alamat Lengkap
                </h1>
                <h1 className="text-sm font-medium text-slate-50">
                  {user?.alamat_lengkap}
                </h1>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full">
              <button
                onClick={() => {
                  if (selectedPayment === 'gakuniq wallet') {
                    if (user.saldo < total) {
                      alert('Saldo GAKUNIQ WALLET anda tidak mencukup');
                    } else {
                      Checkout();
                    }
                  } else {
                    Checkout();
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

export default Transaksi;
