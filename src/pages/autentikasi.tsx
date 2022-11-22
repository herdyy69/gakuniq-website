/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-self-import */
/* eslint-disable import/extensions */
/* eslint-disable unused-imports/no-unused-vars */
// import { useRouter } from 'next/router';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

const Autentikasi = () => {
  const Router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);
  const [showAlert, setShowAlert] = useState([], true);
  const [confirmation, setConfirmation] = useState('');
  const [colorAlert, setColorAlert] = useState('bg-red-500');

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    // console.log(formData);

    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        Cookies.set('token', response.data.token);
        Router.push('/my-account/profiles');
      })
      .catch((error) => {
        setShowAlert(error.response.data);
        setTimeout(() => {
          setColorAlert('bg-red-500');
        }, 1000);
      });
  };
  useEffect(() => {
    if (Cookies.get('token')) {
      Router.push('/akun');
    }
  }, []);

  const dataReferensi = [
    {
      id: 1,
      title: 'Modern',
    },
    {
      id: 2,
      title: 'Minimalis',
    },
    {
      id: 3,
      title: 'Klasik',
    },
    {
      id: 4,
      title: 'Retro',
    },
  ];

  const [nama_depan, setNamaDepan] = useState('');
  const [nama_belakang, setNamaBelakang] = useState('');
  const [no_telepon, setNomerTelepon] = useState('');
  const [username_daftar, setUsernameDaftar] = useState('');
  const [email_daftar, setEmailDaftar] = useState('');
  const [password_daftar, setPasswordDaftar] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [jenis_kelamin, setJenisKelamin] = useState('Laki-laki');
  const [tanggal_lahir, setTanggalLahir] = useState('');
  const [referensi, setReferensi] = useState('');
  const [label_alamat, setLabelAlamat] = useState('Rumah');
  const [kota_kecamatan, setKotaKecamatan] = useState('');
  const [alamat_lengkap, setAlamatLengkap] = useState('');

  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');

  const kota_kecamatanHandler = `${kota}, ${kecamatan}`;

  useEffect(() => {
    setKotaKecamatan(kota_kecamatanHandler);
  }, [kota_kecamatanHandler]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const allValue = new FormData();
    allValue.append('nama_depan', nama_depan);
    allValue.append('nama_belakang', nama_belakang);
    allValue.append('no_telepon', no_telepon);
    allValue.append('username', username_daftar);
    allValue.append('email', email_daftar);
    allValue.append('password', password_daftar);
    allValue.append('password_confirmation', password_confirmation);
    allValue.append('tanggal_lahir', tanggal_lahir);
    allValue.append('jenis_kelamin', jenis_kelamin);
    allValue.append('referensi', referensi);
    allValue.append('label_alamat', label_alamat);
    allValue.append('kota_kecamatan', kota_kecamatan);
    allValue.append('alamat_lengkap', alamat_lengkap);

    // console.log(allValue);

    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, allValue, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // console.log(response);
        setTimeout(() => {
          Router.reload('/autentikasi');
        }, 2000);
        setConfirmation('Berhasil mendaftar, silahkan login');
      })
      .catch((error) => {
        // console.log(error);
        setValidation(error.response.data);
      });
    // console.log(validation);
  };

  useEffect(() => {}, [validation]);

  // console.log(confirmation);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Login/Register"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      <>
        {showAlert.message && (
          <div className="toast toast-start">
            <div className={`alert alert-success ${colorAlert}`}>
              <div className="flex flex-row">
                <span>{showAlert.message}</span>
                <button
                  className="bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
                  onClick={() => setShowAlert(false)}
                >
                  <span>×</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {confirmation && (
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
        )}
        <div className="flex flex-col items-center justify-center h-[100vh] text-center bg-slate-600 rounded-md">
          <div className="flex flex-col items-center justify-center w-full max-w-xs px-4 py-6 bg-white hover:bg-slate-100 rounded-md fixed shadow-lg">
            <img
              src="/assets/images/logo.png"
              alt="Gakunique"
              className="h-24 w-24 mb-5"
            />
            <form className="w-full" onSubmit={loginHandler}>
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  className="input input-bordered w-full bg-gray-100 hover:bg-slate-50 text-sm text-slate-800"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password..."
                  className="input input-bordered w-full bg-gray-100 hover:bg-slate-50 text-sm text-slate-800"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div className="flex flex-row items-center justify-between w-full mt-2">
                  <label className="flex flex-row items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm mr-1"
                    />
                    <span className="text-xs text-slate-600">Remember me</span>
                  </label>
                  <Link legacyBehavior href="/forgot-password">
                    <a className="text-xs text-slate-600">Forgot password?</a>
                  </Link>
                </div>

                <button
                  // onClick={loginHandler}
                  type="submit"
                  className="btn btn-primary w-full mt-[3rem]"
                >
                  Login
                </button>

                <div className="flex flex-row items-center justify-center w-full space-x-2">
                  <div className="h-px bg-slate-200 w-full"></div>
                  <span className="text-xs text-slate-600">or</span>
                  <div className="h-px bg-slate-200 w-full"></div>
                </div>
                <label
                  htmlFor="my-modal-3"
                  type="button"
                  className="btn btn-outline w-full"
                >
                  Register
                </label>
              </div>
            </form>
          </div>
        </div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal ">
          <div className="modal-box w-[40%] max-w-5xl relative bg-slate-500">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-slate-800"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold border-b-2 mb-3 text-white">
              Daftar Akun Baru
            </h3>
            <form onSubmit={handleRegister}>
              <div className="flex flex-col md:flex-row flex-wrap my-2">
                <div className="form-control m-1  w-full max-w-[auto] md:max-w-[15rem]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Nama Depan
                    </span>
                    <input
                      required
                      type="text"
                      value={nama_depan}
                      onChange={(e) => setNamaDepan(e.target.value)}
                      placeholder="Nama Depan"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
                <div className="form-control m-1  w-full max-w-[auto] md:max-w-[15rem]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Nama Belakang
                    </span>
                    <input
                      required
                      type="text"
                      value={nama_belakang}
                      onChange={(e) => setNamaBelakang(e.target.value)}
                      placeholder="Nama Belakang"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
                <div className="form-control m-1 w-full max-w-[100%]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Nomer Telepon
                    </span>
                    <input
                      required
                      type="number"
                      value={no_telepon}
                      onChange={(e) => setNomerTelepon(e.target.value)}
                      placeholder="Nomer Telepon"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
                <div className="form-control m-1 w-full max-w-[100%]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={email_daftar}
                      onChange={(e) => setEmailDaftar(e.target.value)}
                      placeholder="Email"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                  {validation.email && (
                    <span className="text-red-200 text-xs mt-1">
                      {validation.email[0]}
                    </span>
                  )}
                </div>
                <div className="form-control m-1 w-full max-w-[100%]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Username
                    </span>
                    <input
                      required
                      type="text"
                      value={username_daftar}
                      onChange={(e) => setUsernameDaftar(e.target.value)}
                      placeholder="Username"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                  {validation.username && (
                    <span className="text-red-200 text-xs mt-1">
                      {validation.username[0]}
                    </span>
                  )}
                </div>
                <div className="form-control m-1 w-full max-w-[100%]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Password Baru
                    </span>
                    <input
                      required
                      type="password"
                      value={password_daftar}
                      onChange={(e) =>
                        setPasswordDaftar(e.target.value) +
                        setPasswordConfirmation(e.target.value)
                      }
                      placeholder="Password Baru"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                  {validation.password && (
                    <span className="text-red-200 text-xs mt-1">
                      {validation.password[0]}
                    </span>
                  )}
                </div>
                <div className="form-control m-1 w-full max-w-[auto] md:max-w-[45.7%]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Jenis Kelamin
                    </span>
                    <select
                      value={jenis_kelamin}
                      onChange={(e) => setJenisKelamin(e.target.value)}
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </label>
                </div>
                <div className="form-control m-1 w-full max-w-[auto] md:max-w-[50%]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Tanggal Lahir
                    </span>
                    <input
                      required
                      type="date"
                      value={tanggal_lahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      placeholder="Tanggal Lahir"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
              </div>
              <hr className="w-full h-px my-3 border-slate-200" />
              <h1 className="text-white font-bold">Data Alamat</h1>
              <div className="flex flex-col md:flex-row flex-wrap my-2">
                <div className="form-control m-1 w-full">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Label Rumah / Kantor
                    </span>
                    <select
                      value={label_alamat}
                      onChange={(e) => setLabelAlamat(e.target.value)}
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    >
                      <option value="Rumah">Rumah</option>
                      <option value="Kantor">Kantor</option>
                    </select>
                  </label>
                </div>
                <div className="form-control m-1 w-full">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Kota / Kabupaten
                    </span>
                    <input
                      required
                      type="text"
                      value={kota}
                      onChange={(e) => setKota(e.target.value)}
                      placeholder="Kota / Kabupaten"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
                <div className="form-control m-1 w-full max-w-[auto]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Kecamatan
                    </span>
                    <input
                      required
                      type="text"
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                      placeholder="Kecamatan"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
                <div className="form-control m-1  w-full max-w-[auto]">
                  <label className="input-group input-group-vertical">
                    <span className="bg-slate-600 font-bold text-white py-1">
                      Alamat Lengkap
                    </span>
                    <input
                      required
                      type="text"
                      value={alamat_lengkap}
                      onChange={(e) => setAlamatLengkap(e.target.value)}
                      placeholder="Alamat Lengkap"
                      className="input input-bordered bg-slate-100 bg-opacity-100"
                    />
                  </label>
                </div>
              </div>
              <hr className="w-full h-px my-3 border-slate-200" />
              <div className="privacy&policy">
                <div className="flex flex-row items-start justify-center">
                  <input
                    required
                    type="checkbox"
                    className="checkbox checkbox-sm mt-1"
                    id="checkbox-1"
                  />
                  <label htmlFor="checkbox-1" className="cursor-pointer">
                    <span className="ml-2 text-white text-sm">
                      Saya telah membaca dan menyetujui
                      <a href="#" className="text-blue-500 font-bold">
                        {' '}
                        Syarat & Ketentuan{' '}
                      </a>
                      dan
                      <a href="#" className="text-blue-500 font-bold">
                        {' '}
                        Kebijakan Privasi{' '}
                      </a>
                      yang berlaku
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-center my-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full max-w-[100%]"
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </Main>
  );
};

export default Autentikasi;
