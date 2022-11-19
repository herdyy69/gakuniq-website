/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GiSelfLove } from 'react-icons/gi';
import { GrFormView } from 'react-icons/gr';
import { TbDiscount2 } from 'react-icons/tb';

import Alert from '@/components/Alert';
import { Meta } from '@/layouts/Meta';
import axios from '@/lib/axios';
import { Main } from '@/templates/Main';

const DynamicKategori = () => {
  const router = useRouter();
  const [params, setParams] = useState(router.query.id);
  const token = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const [user, setUser] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [kategori, setKategori] = useState();
  const [wishlist, setWishlist] = useState();
  const [err, setErr] = useState();
  const [confirmation, setConfirmation] = useState();
  const [clicked, setClicked] = useState(false);
  const addToWishlist = async (id) => {
    await axios
      .post('/api/wishlist/create', { produk_id: id })
      .then((res) => {
        setConfirmation(res.data.message);
        setTimeout(() => {
          router.reload();
        }, 1000);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };

  const GETDATA = async () => {
    if (token) {
      await axios
        .get('/api/user')
        .then((res) => {
          setUser(res.data.data[0]);
        })
        .catch((err) => {
          setErr(err);
        });
      await axios
        .get('/api/wishlist')
        .then((res) => {
          setWishlist(res.data.data);
        })
        .catch((err) => {
          setErr(err);
        });
    }
    await axios
      .get('/api/kategori')
      .then((res) => {
        setKategori(res.data.data);
      })
      .catch((err) => {
        // setErr(err);
      });
    await axios
      .get('/api/sub_kategori')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        setErr(err);
      });
    await axios
      .get('/api/produk')
      .then((res) => {
        setProducts(res.data.data);
        setClicked('SEMUA');
      })
      .catch((err) => {
        setErr(err);
      });
  };
  useEffect(() => {
    GETDATA();
  }, []);

  const katalog = [
    {
      id: 1,
      title: 'SEMUA',
      link: '/category/semua',
    },
  ];

  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Wanita"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      {confirmation ? (
        <Alert alert={confirmation} close={() => setConfirmation('')} />
      ) : (
        ''
      )}
      {err ? <Alert alert={err} close={() => setErr('')} /> : ''}

      <div className="flex flex-row overflow-x-scroll border-y-2 border-slate-800 py-2">
        {katalog.map((item) => (
          <Link href={item.link} key={item.id}>
            <button
              type="button"
              className={` hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[10rem] ${
                item.title === clicked
                  ? 'bg-blue-700 shadow-md glass'
                  : 'bg-blue-500'
              }`}
              onClick={() =>
                axios
                  .get(`/api/produk`)
                  .then((res) => {
                    setProducts(res.data.data);
                    setClicked(item.title);
                  })
                  .catch((err) => {
                    setErr(err);
                  })
              }
            >
              {item.title}
            </button>
          </Link>
        ))}

        {kategori?.map((item) =>
          item && item.name !== 'KATALOG' ? (
            <>
              <Link href={`/category/${item.name}`} key={item.id}>
                <button
                  type="button"
                  className={` hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1 w-[10rem] ${
                    item.name === clicked
                      ? 'bg-blue-700 shadow-md glass'
                      : 'bg-blue-500'
                  }`}
                  onClick={() =>
                    axios
                      .get(`/api/produk/kategori/${item.id}`)
                      .then((res) => {
                        setProducts(res.data.data);
                        setClicked(item.name);
                      })
                      .catch((err) => {
                        setErr(err);
                      })
                  }
                >
                  {item.name}
                </button>
              </Link>
            </>
          ) : (
            ''
          )
        )}
      </div>

      {products ? (
        <div className="flex flex-row flex-wrap items-stretch self-auto justify-start">
          {products?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-start items-start bg-gray-400 p-4 rounded-lg max-w-[20rem] md:max-w-[15rem] border-2 m-2"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.gambar_produk1}`}
                alt={item.gambar_produk1}
                className="md:w-48 rounded-md my-1 mb-2 mx-auto"
              />
              <div className="flex flex-col justify-center items-start mx-1">
                <h1 className="text-base font-bold text-slate-800">
                  {item.nama_produk}
                  <span className="text-xs text-gray-700 ml-1">
                    (
                    {
                      categories?.find((x) => x.id === item.sub_kategori_id)
                        ?.sub_kategori
                    }
                    )
                  </span>
                </h1>
                <span className="text-sm text-slate-800">
                  {item.description}
                </span>
                <div className="flex flex-row justify-start items-center mt-2">
                  <span className="text-sm text-slate-800 font-bold">
                    Rp{'  '}
                    {item.diskon > 0
                      ? Math.round(
                          item.harga - (item.harga * item.diskon) / 100
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      : item.harga
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </span>
                </div>
                {item.diskon > 0 && (
                  <div className="flex flex-row justify-center items-center mt-3">
                    <span className="text-sm text-slate-800 font-bold">
                      <TbDiscount2 className="text-xl text-slate-800 font-bold" />
                    </span>
                    <span className="text-sm text-slate-800 font-bold">
                      {item.diskon}%
                    </span>
                    <span className="text-sm text-slate-800 font-bold line-through mx-2">
                      Rp{'  '}
                      {item.harga
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </span>
                  </div>
                )}
                <div className="flex flex-row justify-center items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push({
                        pathname: `/product/${item.name}`,
                        query: { id: item.id },
                      });
                    }}
                    className="btn md:btn-sm btn-md rounded-none glass bg-slate-300 text-slate-800 mt-3"
                  >
                    View <GrFormView className="inline-block ml-1 w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (user) {
                        wishlist?.find((x) => x.produk_id === item.id)
                          ? setConfirmation('Produk sudah ada di wishlist')
                          : addToWishlist(item.id);
                      } else {
                        setConfirmation('Silahkan login terlebih dahulu');
                      }
                    }}
                    className="btn md:btn-sm btn-md rounded-none glass bg-slate-400 text-slate-800 mt-3"
                  >
                    Wishlist{' '}
                    <GiSelfLove className="inline-block ml-1 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-xl text-slate-800 font-bold ">Loading...</h1>
      )}
    </Main>
  );
};

export default DynamicKategori;