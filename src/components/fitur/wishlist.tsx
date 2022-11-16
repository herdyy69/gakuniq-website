/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import axios from '@/lib/axios';

const Wishlist = () => {
  // const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [wishlist, setWishlist] = useState();

  const [confirmation, setConfirmation] = useState();

  const getProduct = async () => {
    await axios
      .get('/api/user')
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get('/api/produk')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get('/api/sub_kategori')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get('/api/wishlist')
      .then((res) => {
        setWishlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlist = async (id) => {
    await axios
      .delete(`/api/wishlist/${id}`)
      .then((res) => {
        setConfirmation('Berhasil menghapus produk dari wishlist');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAllWishlist = async () => {
    await axios
      .get('/api/delete/wishlist')
      .then((res) => {
        setConfirmation('Berhasil menghapus semua produk dari wishlist');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col items-start justify-between sm:max-w-[33vw] max-w-[80vw] min-h-full bg-slate-600 py-8 pl-4">
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
      <div>
        <h1 className="text-2xl font-medium text-slate-50 border-b-2 w-56 pb-2">
          Wishlist
        </h1>
        <div className="flex flex-col items-start justify-start overflow-y-scroll mt-7">
          {wishlist?.length === 0 && (
            <h1 className="text-xl font-medium text-slate-50">
              Wishlist Kosong
            </h1>
          )}
          {wishlist?.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between bg-slate-800 sm:w-[30vw] w-[70vw] min-h-[4rem] rounded-md mb-1 py-3 px-2"
            >
              <div className="flex flex-row items-center justify-start">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.produk.gambar_produk1}`}
                  alt="gambar"
                  className="h-16 w-16 rounded-md"
                />
                <div className="flex flex-col items-start justify-center ml-2">
                  <h1 className="sm:text-sm text-xs font-medium text-slate-50">
                    {
                      products?.find((produk) => produk.id === item.produk_id)
                        ?.nama_produk
                    }
                  </h1>
                  <h3 className="sm:text-xs text-[11px] font-medium text-slate-50">
                    {
                      products?.find((produk) => produk.id === item.produk_id)
                        ?.deskripsi
                    }
                  </h3>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center mr-2">
                <button
                  onClick={() => deleteWishlist(item.id)}
                  className="btn btn-circle btn-outline btn-xs sm:btn-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-slate-800 sm:w-[30vw] w-[70vw] min-h-[8rem] bottom-0 p-4 mt-10">
        <div className="flex flex-col items-start justify-between w-full px-2">
          <button className="btn btn-outline btn-sm sm:btn-md w-full mt-2">
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              Lanjut Belanja
            </h1>
          </button>

          <button
            onClick={() => deleteAllWishlist()}
            className="btn btn-outline btn-sm sm:btn-md w-full mt-2"
          >
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              Hapus Semua
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
