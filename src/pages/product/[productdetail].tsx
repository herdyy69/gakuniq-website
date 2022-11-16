/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable unused-imports/no-unused-vars */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Alert from '@/components/Alert';
import { Meta } from '@/layouts/Meta';
import axios from '@/lib/axios';
import { Main } from '@/templates/Main';

const DetailProduct = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [params, setParams] = useState(router.query.id);

  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [products, setProducts] = useState();
  const [subCategory, setSubCategory] = useState();
  const [review, setReview] = useState();
  const [confirmation, setConfirmation] = useState();

  const GetValue = async () => {
    await axios
      .get('/api/all/user')
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
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
      .get(`/api/produk/${params}`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`/api/sub_kategori`)
      .then((res) => {
        setSubCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`/api/review_produk/${params}`)
      .then((res) => {
        setReview(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCart = async (id) => {
    await axios
      .post('/api/keranjang/create', {
        produk_id: params,
        jumlah: quantity,
        warna: clickedColor,
        ukuran: clickedSize,
      })
      .then((res) => {
        setConfirmation('Berhasil menambahkan produk ke keranjang');
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    GetValue();
  }, []);

  const [clickedColor, setClickedColor] = useState('red');
  const [clickedSize, setClickedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const dataSize = [
    {
      id: 1,
      size: 'S',
    },
    {
      id: 2,
      size: 'M',
    },
    {
      id: 3,
      size: 'L',
    },
    {
      id: 4,
      size: 'XL',
    },
  ];
  const dataColor = [
    {
      id: 1,
      color: 'red',
    },
    {
      id: 2,
      color: 'blue',
    },
    {
      id: 3,
      color: 'green',
    },
    {
      id: 4,
      color: 'yellow',
    },
  ];

  if (confirmation) {
    setTimeout(() => {
      setConfirmation('');
    }, 3000);
  }

  return (
    <Main
      meta={
        <Meta
          title="Gakunique - Detail Product"
          description="Gakunique is a Next.js starter template with Tailwind CSS, TypeScript, and ESLint."
        />
      }
    >
      {confirmation ? (
        <Alert alert={confirmation} close={() => setConfirmation('')} />
      ) : (
        ''
      )}
      <div className="flex flex-col md:flex-row mt-2">
        <div className="w-full md:w-1/2">
          <Swiper
            speed={600}
            parallax={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Parallax, Pagination, Navigation]}
            className="mySwiper swiper4 rounded-md"
          >
            <div
              slot="container-start"
              className="parallax-bg"
              style={{
                backgroundImage: `url(${`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk1}`})`,
              }}
              data-swiper-parallax="-23%"
            ></div>
            <SwiperSlide>
              <div className="mx-2 flex flex-col" data-swiper-parallax="-200">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk3}`}
                  alt=""
                  className="max-w-[150px] h-auto object-cover my-1"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk3}`}
                  alt=""
                  className="max-w-[150px] h-auto object-cover my-1"
                />
              </div>
              <div className="img" data-swiper-parallax="-100">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk3}`}
                  alt=""
                  className="max-w-[400px] h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="describe bg-slate-100 hover:bg-slate-200 flex flex-row items-center px-3 py-5 rounded-md shadow-md opacity-[1]"
                data-swiper-parallax="-100"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk3}`}
                  alt=""
                  className="max-w-[150px] h-auto object-cover my-1"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk3}`}
                  alt=""
                  className="max-w-[150px] h-auto object-cover my-1"
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${products?.gambar_produk3}`}
                  alt=""
                  className="max-w-[150px] h-auto object-cover my-1"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col items-start justify-center w-full mx-4">
          {/* name product */}
          <h1 className="text-2xl font-bold text-slate-800">
            {products?.nama_produk}
            <span className="text-sm font-bold text-slate-800 ml-1">
              ({' '}
              {
                subCategory?.find((x) => x.id === products?.sub_kategori_id)
                  ?.sub_kategori
              }{' '}
              )
            </span>
          </h1>
          <h1 className="text-2xl font-bold text-slate-800">
            Rp{' '}
            {products?.harga?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </h1>
          <span className="text-sm font-bold text-slate-800 mt-[1rem] mb-[2rem]">
            {products?.deskripsi}
          </span>
          <div className="flex flex-row items-center justify-center mt-2">
            {dataColor.map((datas) => (
              <button
                key={datas.id}
                onClick={() => setClickedColor(datas.color)}
                className={` hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-sm font-bold py-2 px-4 rounded-md mr-2 ${
                  clickedColor === datas.color
                    ? 'bg-slate-100 glass'
                    : 'bg-slate-300 glass'
                }`}
              >
                {datas.color}
              </button>
            ))}
          </div>
          <div className="jus10tify-center flex flex-row items-center mt-2">
            {dataSize.map((item) => (
              <button
                key={item.id}
                onClick={() => setClickedSize(item.size)}
                className={` hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-sm font-bold py-2 px-4 rounded-md mr-2 w-[5rem] ${
                  clickedSize === item.size
                    ? 'bg-slate-100 glass'
                    : 'bg-slate-300 glass'
                }`}
              >
                {item.size}
              </button>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center mt-4">
            {/* quantity input button */}
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                } else {
                  setQuantity(1);
                }
              }}
              className="hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-sm font-bold py-2 px-4 rounded-md glass"
            >
              -
            </button>
            <input
              type="number"
              value={products?.stok > 0 ? quantity : 'stok habis'}
              onChange={(e) => setQuantity(e.target.value)}
              className="input input-bordered input-md bg-slate-50 max-w-[150px] text-center mx-1"
            />
            <button
              onClick={() => {
                if (quantity >= products?.stok) {
                  setQuantity(products?.stok);
                } else {
                  setQuantity(quantity + 1);
                }
              }}
              className="hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-sm font-bold py-2 px-4 rounded-md glass"
            >
              +
            </button>
          </div>
          <div className="flex flex-row items-center justify-center mt-3">
            <button
              onClick={() => {
                router.back();
              }}
              className="btn btn-error rounded-none"
            >
              Kembali
            </button>
            <button
              onClick={() => {
                token
                  ? products?.stok > 0
                    ? addCart()
                    : setConfirmation('Stok habis')
                  : setConfirmation('Silahkan login terlebih dahulu');
              }}
              className="btn btn-success rounded-none"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center w-full mt-5">
        <h1 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-500 pb-2 mb-2 ">
          Ulasan Product
        </h1>
        <div className="flex flex-row flex-wrap items-start justify-start w-full mx-auto">
          {review?.length > 0 ? (
            review.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-start justify-center w-[45vw] m-2 min-h-8 bg-slate-400 rounded-lg p-4"
              >
                {/* nama user */}
                <h1 className="text-lg font-medium text-slate-800 uppercase">
                  {/* {user?.map((dataUser) =>
                    dataUser.id === review?.user_id
                      ? `${dataUser?.nama_depan} ${dataUser?.nama_belakang}`
                      : ''
                  )}{' '} */}
                </h1>
                <span className="text-sm font-normal text-slate-800">
                  {item?.komen}
                </span>
                <span className="text-xs font-bold text-slate-800 mt-3">
                  {item?.status}
                </span>
              </div>
            ))
          ) : (
            <h1 className="text-lg font-medium text-slate-800 uppercase">
              Belum ada ulasan
            </h1>
          )}
        </div>
      </div>
    </Main>
  );
};

export default DetailProduct;
