/* eslint-disable no-nested-ternary */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-self-import */
/* eslint-disable import/extensions */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { CiWallet } from 'react-icons/ci';
import axios from '@/lib/axios';
import Cookies from 'js-cookie';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const MyProfiles = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [user, setUser] = useState();
  const [err, setErr] = useState();
  const [confirmation, setConfirmation] = useState();

  const getProfiles = async () => {
    await axios
      .get('/api/user')
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const handleLogout = async () => {
    await axios
      .post(`/api/logout/${user.id}`)
      .then((res) => {
        setConfirmation(res.data.message);
        Cookies.remove('token');
        router.push('/');
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };

  const updateProfiles = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/user/${user.id}/edit`, {
        nama_depan: nama_Depan,
        nama_belakang: nama_Belakang,
        no_telepon: nomer_Handphone,
        email: emails,
        referensi,
        label_alamat: labelAlamat,
        kota_kecamatan: `${kota}, ${kecamatan}`,
        alamat_lengkap: alamatLengkap,
      })
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        setErr(err);
      });
    setConfirmation('Data berhasil diubah');
    setTimeout(() => {
      setConfirmation('');
      router.reload();
    }, 3000);
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const [nama_Depan, setNamaDepan] = useState(user?.nama_depan);
  const [nama_Belakang, setNamaBelakang] = useState(user?.nama_delakang);
  const [emails, setEmail] = useState(user?.email);
  const [nomer_Handphone, setNomerHandphone] = useState(user?.no_telepon);
  const [labelAlamat, setLabelAlamat] = useState('Rumah');
  const [kotaKecamatan, setKotaKecamatan] = useState(user?.kota_kecamatan);
  const [alamatLengkap, setAlamatLengkap] = useState(user?.alamat_lengkap);
  const [referensi, setReferensi] = useState(1);

  const [kota, setKota] = useState();
  const [kecamatan, setKecamatan] = useState();
  // END OF FITUR UPDATE PROFILE

  // FITUR TOP UP
  const [nominal, setNominal] = useState('0');
  const [payment, setPayment] = useState('BCA');
  const listPayment = [
    {
      id: 1,
      name: 'BCA',
    },
    {
      id: 2,
      name: 'BNI',
    },
    {
      id: 3,
      name: 'BRI',
    },
    {
      id: 4,
      name: 'Mandiri',
    },
  ];

  const handleTopUp = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/top_up/create', {
        jumlah_saldo: nominal,
        metode_pembayaran: payment,
      })
      .then((res) => {
        setConfirmation(res.data.message);
        setTimeout(() => {
          setConfirmation('');
          router.reload();
        }, 3000);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };

  // END FITUR TOP UP

  const dataReferences =
    user?.jenis_kelamin === 'Laki-laki'
      ? [
          {
            id: 1,
            name: 'MODERN PRIA',
          },
          {
            id: 2,
            name: 'KLASIK PRIA',
          },
          {
            id: 3,
            name: 'RETRO PRIA',
          },
        ]
      : [
          {
            id: 4,
            name: 'MODERN WANITA',
          },
          {
            id: 5,
            name: 'KLASIK WANITA',
          },
          {
            id: 6,
            name: 'RETRO WANITA',
          },
        ];

  useEffect(() => {
    getProfiles();
    dataReferences;
  }, []);

  const [history, setHistory] = useState();
  const [transaksi, setTransaksi] = useState();
  const getHistory = () => {
    axios
      .get('/api/history')
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        setErr(err);
      });
    axios('/api/transaksi')
      .then((res) => {
        setTransaksi(res.data.data);
      })
      .catch((err) => {
        setErr(err);
      });
  };

  console.log(history);

  useEffect(() => {
    getHistory();
    getVoucher();
  }, []);
  const [review, setReview] = useState('Kamu nanyaeaa aku mau komen apa?');
  const [rating, setRating] = useState('Recommended');

  const [voucher, setVoucher] = useState();
  const [voucherUser, setVoucherUser] = useState();

  const getVoucher = async () => {
    await axios
      .get('/api/voucher')
      .then((res) => {
        setVoucher(res.data.data);
      })
      .catch((err) => {
        setErr(err);
      });
    await axios
      .get('/api/voucher_user')
      .then((res) => {
        setVoucherUser(res.data.data);
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const voucherUserFilter = voucherUser?.filter(
    (item, index) =>
      voucherUser?.findIndex(
        (item2) => item2.voucher_id === item.voucher_id
      ) === index
  );

  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Profiles"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      {confirmation ? (
        <div className="toast toast-start  z-[1000] absolute">
          <div className={'alert alert-success bg-green-600 text-white'}>
            <div className="flex flex-row">
              <span>{confirmation}</span>
              <button
                className="bg-transparent text-xl hover:text-red-600 font-semibold leading-none outline-none focus:outline-none"
                onClick={() => setConfirmation('')}
              >
                <span>×</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/*  MODAL UPDATE PROFILE */}
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal">
        <form onSubmit={updateProfiles}>
          <div className="modal-box relative bg-slate-200 w-full">
            <label
              htmlFor="my-modal-1"
              className="btn btn-sm btn-circle absolute right-2 top-2 glass"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">
              <span className="text-primary">Update</span> Profile
            </h3>
            <span className="text-sm font-bold text-gray-800">
              Update your profile information
            </span>
            <div className="mt-4 w-full">
              <div className="flex flex-col justify-start items-start w-full">
                <span className="label-text">Nama Depan</span>
                <input
                  value={nama_Depan}
                  onChange={(e) => setNamaDepan(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.nama_depan}
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <span className="label-text">Nama Belakang</span>
                <input
                  value={nama_Belakang}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.nama_belakang}
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <span className="label-text">Email</span>
                <input
                  value={emails}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.email}
                />
              </div>
              <div className="flex flex-col justify-start items-start mb-3 w-full">
                <span className="label-text">Nomer Handphone</span>
                <input
                  minLength="10"
                  maxLength="13"
                  value={nomer_Handphone}
                  onChange={(e) => setNomerHandphone(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.no_telepon}
                />
              </div>
              <span className="text-sm font-bold text-gray-800">
                Update your Address information
              </span>
              <div className="flex flex-col justify-start items-start w-full mt-2">
                <span className="label-text">Label Alamat</span>
                <select
                  value={labelAlamat}
                  onChange={(e) => setLabelAlamat(e.target.value)}
                  className="input input-bordered input-sm bg-slate-50 w-full"
                >
                  <option value="1">Rumah</option>
                  <option value="2">Kantor</option>
                  <option value="3">Lainnya</option>
                </select>
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <span className="label-text">Kota</span>
                <input
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.kota_kecamatan}
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <span className="label-text">Kecamatan</span>
                <input
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.kota_kecamatan}
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full mb-2">
                <span className="label-text">Alamat Lengkap</span>
                <input
                  value={alamatLengkap}
                  onChange={(e) => setAlamatLengkap(e.target.value)}
                  type="text"
                  className="input input-bordered input-sm bg-slate-50 w-full"
                  required
                  placeholder={user?.alamat_lengkap}
                />
              </div>
              <span className="text-sm font-bold text-gray-800">
                Update References
              </span>
              <div className="flex flex-row justify-start items-start mt-1">
                {dataReferences.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setReferensi(item.id)}
                    className={`btn btn-sm rounded-none ml-1 w-[auto] ${
                      referensi === item.id ? 'btn-accent' : 'btn-ghost glass'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-row items-center mt-4 w-full ml-1">
              <label
                htmlFor="my-modal-1"
                className="btn bg-red-500 text-white rounded-none border-none btn-sm w-[50%]"
              >
                Batal
              </label>
              <button
                type="submit"
                className="b-2 btn btn-primary rounded-none btn-sm w-[49.5%]"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* END MODAL UPDATE PROFILE */}

      {/* MODAL FITUR TOP UP */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <form onSubmit={handleTopUp}>
          <div className="modal-box relative bg-slate-200">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2 glass"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">
              Isi ulang saldo Gakunique Wallet
            </h3>
            <span className="text-sm text-gray-500">
              Saldo Gakunique Wallet akan otomatis bertambah sesuai nominal yang
              Anda isi.
            </span>
            <div className="flex flex-row items-center">
              <label className="text-sm font-bold mr-2">Nominal</label>
              <input
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                type="number"
                className="input input-bordered input-sm bg-slate-50 ml-2"
                placeholder="Rp 0"
              />
            </div>

            <div className="flex flex-row items-center mt-1">
              <label className="text-sm font-bold mr-2">Payment</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="border-2 w-44 bg-slate-50 p-1 rounded-lg text-sm ml-1"
              >
                {listPayment.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center mt-3">
              <label
                htmlFor="my-modal-3"
                className="btn bg-red-500 text-white border-none btn-sm rounded-none"
              >
                Batal
              </label>
              <button
                type="submit"
                className="btn btn-primary btn-sm rounded-none"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* END MODAL FITUR TOP UP */}

      {user ? (
        <>
          <div className="flex flex-col items-center justify-start py-[2rem] bg-slate-800 mx-10">
            <div className="flex flex-row items-center justify-center w-full">
              <img
                src="/assets/images/logo.png"
                alt="ada"
                className="max-w-[225px] h-auto border-2 border-slate-50 rounded-full p-3 mx-2"
              />
              <div className="flex flex-col mx-2">
                <h1 className="text-2xl font-medium text-slate-50 mt-4">
                  {user?.nama_depan} {user?.nama_belakang}
                </h1>
                <span className="text-sm font-normal text-slate-50 mt-0">
                  {user?.email}
                </span>
                <div className="flex flex-row items-center justify-start mt-1">
                  <span className="text-sm font-normal text-slate-50 mt-0">
                    <CiWallet className="inline-block mr-2 text-2xl" />
                  </span>
                  <span className="text-sm font-normal text-slate-50 mt-0">
                    Rp{' '}
                    {user?.saldo
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </span>
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-ghost btn-outline btn-xs ml-2 rounded-none"
                  >
                    Top Up
                  </label>
                </div>
                <div className="flex flex-row items-center justify-start mt-1">
                  <span className="text-xs font-normal text-slate-50 mt-0 mr-2">
                    Point
                  </span>
                  <span className="text-xs font-normal text-slate-50 mt-0">
                    {user?.score}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center mt-1">
                  <label
                    htmlFor="my-modal-1"
                    className="btn btn-outline btn-sm mt-2 text-xs font-medium text-slate-50 mr-1"
                  >
                    Edit Profile
                  </label>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm mt-2 text-xs font-medium text-slate-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center py-[2rem] bg-slate-800 mx-10 min-h-8 mt-2 p-2">
            <div className="flex flex-col items-center justify-center w-[50vw] bg-slate-100 min-h-8 mx-1 p-3 mt-1 rounded-lg">
              <h1 className="text-lg font-bold text-slate-800 mb-3">
                Riwayat Transaksi
              </h1>
              {history?.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <span className="text-sm font-normal text-slate-800 mt-0">
                    Empty
                  </span>
                </div>
              )}
              {history ? (
                history.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between w-full bg-transparent border-2 border-slate-800 min-h-8 mt-1 px-3 py-4"
                  >
                    <div className="flex flex-row items-center justify-start">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.gambar_produk1}`}
                        alt="gambar"
                        className="h-16 w-16 rounded-md shadow-md"
                      />
                      <div className="flex flex-col items-start justify-center ml-2 text-slate-800">
                        <h1 className="sm:text-sm text-xs font-medium">
                          {item.nama_produk}
                        </h1>
                        <h3 className="sm:text-xs text-[11px] font-medium">
                          {item.keranjang.jumlah} Barang | Rp{'  '}
                          {item.total_harga
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </h3>
                        <h4 className="text-[11px] font-medium">
                          G{item.kode_transaksi} - {item.status}
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mr-2">
                      {item.status === 'proses' ? (
                        <div className="flex flex-row flex-nowrap items-center justify-between w-full">
                          <button
                            className="btn btn-ghost bg-green-500 text-sm btn-sm font-bold rounded-none p-2 mx-1 text-white"
                            onClick={() => {
                              axios
                                .put(`/api/history/${item?.id}/edit`, {
                                  status: 'sukses',
                                })
                                .then((res) => {
                                  setTimeout(() => {
                                    router.reload();
                                  }, 1000);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            SELESAI
                          </button>
                          <button
                            className="btn btn-ghost bg-red-500 text-sm btn-sm font-bold rounded-none p-2 mx-1 text-white"
                            onClick={() => {
                              axios
                                .post(`/api/refund_produk/create/${item.id}`, {
                                  alasan: 'Tidak sesuai',
                                  transaksi_id: item.id,
                                })
                                .then((res) => {
                                  setTimeout(() => {
                                    router.reload();
                                  }, 1000);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            REFUND
                          </button>
                        </div>
                      ) : item.status === 'sukses' ? (
                        // button for modal review
                        <>
                          <label
                            htmlFor="my-modal-6"
                            className="btn btn-ghost bg-green-500 text-sm font-bold rounded-none btn-sm p-2 mx-1 text-white"
                          >
                            REVIEW
                          </label>
                          <input
                            type="checkbox"
                            id="my-modal-6"
                            className="modal-toggle"
                          />
                          <div className="modal modal-bottom sm:modal-middle bg-slate-800 bg-opacity-50">
                            <div className="modal-box bg-slate-600 text-slate-800">
                              <h3 className="text-lg font-bold text-center">
                                Review Produk
                              </h3>
                              <div className="rating">
                                <input
                                  type="radio"
                                  name="rating-1"
                                  className="mask mask-star bg-orange-400"
                                  onClick={() =>
                                    setRating('Gak Recommended Banget')
                                  }
                                />
                                <input
                                  type="radio"
                                  name="rating-1"
                                  className="mask mask-star bg-orange-400"
                                  onClick={() => setRating('Gak Recommended')}
                                />
                                <input
                                  type="radio"
                                  name="rating-1"
                                  className="mask mask-star bg-orange-400"
                                  onClick={() => setRating('Biasa Saja')}
                                />
                                <input
                                  type="radio"
                                  name="rating-1"
                                  className="mask mask-star bg-orange-400"
                                  onClick={() => setRating('Recommended')}
                                />
                                <input
                                  type="radio"
                                  name="rating-1"
                                  className="mask mask-star bg-orange-400"
                                  onClick={() =>
                                    setRating('Recommended Banget')
                                  }
                                />
                              </div>

                              <input
                                type="text"
                                className="input input-bordered w-full mt-2 bg-slate-400 text-slate-800"
                                placeholder="Tulis review anda disini"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                              />
                              <div className="modal-action">
                                <label
                                  onClick={() => {
                                    axios
                                      .post(`/api/review_produk/create`, {
                                        transaksi_id: item.id,
                                        status: rating,
                                        komen: review,
                                      })
                                      .then((res) => {
                                        axios
                                          .put(`/api/history/${item.id}/edit`, {
                                            status: 'selesai',
                                          })
                                          .then((res) => {
                                            setTimeout(() => {
                                              router.reload();
                                            }, 1000);
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          });
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                  htmlFor="my-modal-6"
                                  className="btn"
                                >
                                  KIRIM
                                </label>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <span className="text-xs font-normal text-slate-800 mt-0">
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-xl font-bold text-slate-800">
                  Loading...
                </h1>
              )}
            </div>

            <div
              onMouseEnter={() => console.log('enter')}
              className="flex flex-col items-center justify-center w-[50vw] bg-slate-100 min-h-8 mx-1 p-3 mt-1 rounded-lg cursor-pointer"
            >
              <h1 className="text-lg font-bold text-slate-800 mb-3">
                Voucher Saya
              </h1>
              {voucherUserFilter?.length < 1 ? (
                <div className="flex flex-row items-center justify-center w-full bg-red-500 border-2 border-red-800 min-h-8 mt-1 px-3 py-1 rounded-lg">
                  <span className="text-lg font-bold text-white">
                    Voucher Kosong
                  </span>
                </div>
              ) : voucherUserFilter ? (
                voucherUserFilter?.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-center justify-between w-full bg-transparent border-2 border-slate-800 min-h-8 mt-1 px-3 py-1 rounded-lg"
                  >
                    <div className="flex flex-row items-center justify-start">
                      <div className="flex flex-col items-start justify-center ml-2 text-slate-800">
                        <h1 className="sm:text-sm text-xs font-medium">
                          {item?.voucher?.kode_voucher}
                        </h1>
                        <h3 className="sm:text-xs text-[11px] font-medium">
                          {' '}
                          {item?.voucher?.diskon} %
                        </h3>
                        <h4 className="text-[11px] font-medium">
                          {item.voucher.waktu_berakhir}
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mr-2">
                      <span className="text-sm font-normal text-slate-800 mt-0">
                        {item.voucher.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-xl font-bold text-slate-800">
                  Loading...
                </h1>
              )}

              <h1 className="text-lg font-bold text-slate-800 mb-3 mt-4">
                Beli Voucher
              </h1>
              {voucher ? (
                voucher
                  ?.sort((a, b) => (a.label === 'gratis' ? -1 : 1))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row items-center justify-between w-full bg-transparent border-2 border-slate-800 min-h-8 mt-1 px-3 py-1 rounded-lg"
                    >
                      <div className="flex flex-row items-center justify-start">
                        <div className="flex flex-col items-start justify-center ml-2 text-slate-800">
                          <h1 className="sm:text-sm text-xs font-medium">
                            {item.kode_voucher}
                          </h1>
                          <h3 className="sm:text-xs text-[11px] font-medium">
                            {item.label === 'gratis' ? (
                              <span>Free</span>
                            ) : (
                              <span>Rp {item.harga}</span>
                            )}
                          </h3>
                          <h4 className="text-[11px] font-medium">
                            {item.diskon} %{' - '}
                            {item.status}
                          </h4>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mr-2">
                        {item.label === 'gratis' ? (
                          <span className="text-xs font-bold">
                            {item.waktu_berakhir}
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              router.push({
                                pathname: '/transaksi/voucher',
                                query: {
                                  id: item.id,
                                },
                              });
                            }}
                            className="btn btn-primary btn-sm"
                          >
                            BUY
                          </button>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <h1 className="text-center text-xl font-bold text-slate-800">
                  Loading...
                </h1>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-xl text-slate-800 font-bold ">Loading...</h1>
      )}
    </Main>
  );
};

export default MyProfiles;
