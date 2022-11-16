/* eslint-disable radix */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Alert from '@/components/Alert';
import axios from '@/lib/axios';

const Cart = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [products, setProducts] = useState();
  const [cart, setCart] = useState();

  const [keranjang, setKeranjang] = useState([]);
  const [total, setTotal] = useState([]);
  const [confirmation, setConfirmation] = useState();

  const getCart = async () => {
    await axios
      .get('/api/keranjang')
      .then((res) => {
        setCart(res.data.data);
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
  };
  const deleteCart = async (id) => {
    await axios
      .delete(`/api/keranjang/${id}`)
      .then((res) => {
        setConfirmation('Berhasil menghapus produk dari keranjang');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteAllCart = async () => {
    await axios
      .get('/api/delete/keranjang')
      .then((res) => {
        setConfirmation('Berhasil menghapus semua produk dari keranjang');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  if (confirmation) {
    setTimeout(() => {
      setConfirmation('');
    }, 3000);
  }

  return (
    <div className="flex flex-col items-start justify-between sm:max-w-[33vw] max-w-[80vw] min-h-full bg-slate-600 py-8 pl-4">
      {confirmation ? (
        <Alert alert={confirmation} close={() => setConfirmation('')} />
      ) : (
        ''
      )}
      <div>
        <h1 className="text-2xl font-medium text-slate-50 border-b-2 w-56 pb-2">
          Keranjang Belanja
        </h1>
        <div className="flex flex-col items-center justify-center overflow-y-auto mt-7">
          {cart?.length === 0 && (
            <h1 className="text-xl font-medium text-slate-50">
              Keranjang Belanja Kosong
            </h1>
          )}
          {cart?.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between bg-slate-800 sm:w-[30vw] w-[70vw] min-h-[4rem] rounded-md mb-1 py-3 px-2"
            >
              <div className="flex flex-row items-center justify-start">
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setKeranjang([...keranjang, item.id]);
                      setTotal([...total, item.total_harga]);
                    } else {
                      setKeranjang(keranjang.filter((x) => x !== item.id));
                      setTotal(total.filter((x) => x !== item.total_harga));
                    }
                  }}
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-slate-600 rounded-md focus:outline-none focus:ring-0 focus:border-slate-500 mx-2"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item?.produk.gambar_produk1}`}
                  alt="gambar"
                  className="h-w-16 w-16 rounded-md"
                />
                <div className="flex flex-col items-start justify-center ml-2">
                  <h1 className="sm:text-sm text-xs font-medium text-slate-50">
                    {item.produk.nama_produk}
                  </h1>
                  <h3 className="sm:text-xs text-[11px] font-medium text-slate-50">
                    New, {item.warna}, {item.ukuran}
                  </h3>
                  <h4 className="sm:text-xs text-[11px] font-normal text-slate-50">
                    {item.jumlah} x Rp{' '}
                    {item.total_harga
                      ? item.total_harga
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      : 0}
                  </h4>
                </div>
              </div>
              {/* delete cart */}
              <div className="flex flex-row items-center justify-center mr-2">
                <button
                  onClick={() => {
                    deleteCart(item.id);
                  }}
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
          <div className="flex flex-row items-center justify-between w-full border-b-2 pb-3 mb-3">
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              SUBTOTAL
            </h1>
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              Rp. {total.reduce((a, b) => parseInt(a) + parseInt(b), 0)}
            </h1>
          </div>

          <button
            onClick={(e) => {
              if (keranjang.length === 0) {
                alert('Silahkan pilih produk');
              } else {
                e.preventDefault();
                router.push({
                  pathname: '/transaksi/product',
                  query: { id: keranjang },
                });
              }
            }}
            className="btn btn-primary btn-sm sm:btn-md w-full mt-2"
          >
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              Checkout
            </h1>
          </button>

          <button className="btn btn-outline btn-sm sm:btn-md w-full mt-2">
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              Lanjut Belanja
            </h1>
          </button>

          <button
            onClick={() => {
              deleteAllCart();
            }}
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

export default Cart;
