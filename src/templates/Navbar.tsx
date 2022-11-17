/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { GiSelfLove } from 'react-icons/gi';
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineSearch,
} from 'react-icons/ai';
import Cart from '@/components/fitur/cart';
import Wishlist from '@/components/fitur/wishlist';
import axios from '@/lib/axios';
import Cookies from 'js-cookie';
import LinkHover from '../components/LinkHover';

const Navbar = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [wishlist, setWishlist] = useState();

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const getProfiles = async () => {
    await axios
      .get('/api/user')
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
      .get('/api/wishlist')
      .then((res) => {
        setWishlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Logout = async () => {
    await axios
      .post(`/api/logout/${user.id}`)
      .then((res) => {
        router.push('/');
        Cookies.remove('token');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const cartLength = cart?.length;
  const wishlistLength = wishlist?.length;

  const menuFitur = user
    ? [
        {
          id: 1,
          title: 'Profile',
          link: '/my-account/profiles',
        },
        {
          id: 2,
          title: 'Transaksi',
          link: '/my-account/profiles',
        },
        {
          id: 3,
          title: 'Logout',
          link: '',
        },
      ]
    : [
        {
          id: 1,
          title: 'Login',
          link: '/autentikasi',
        },
      ];

  const menuKategori = [
    {
      id: 1,
      title: 'PRIA',
      link: '/category/pria',
    },
    {
      id: 2,
      title: 'WANITA',
      link: '/category/wanita',
    },
    {
      id: 3,
      title: 'KATALOG',
      link: '/category/katalog',
    },
  ];
  return (
    <>
      {showCart ? (
        <div
          className={` fixed inset-0 z-[999] top-0 left-0 overflow-scroll bg-slate-800 bg-opacity-70 ${
            showCart
              ? 'animate__animated animate__fadeInLeft'
              : 'animate__animated animate__fadeOutLeft'
          } `}
        >
          <Cart />
        </div>
      ) : null}
      {showCart ? (
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className="animate__animated animate__fadeIn animate__delay-1s btn btn-circle sm:btn-md btn-sm glass text-slate-800 shadow-md fixed top-2 sm:left-[24rem] left-[16rem] z-[1000]"
        >
          X
        </button>
      ) : null}
      {showWishlist ? (
        <div
          className={` fixed inset-0 z-[999] top-0 left-0 overflow-scroll bg-slate-800 bg-opacity-70 ${
            showWishlist
              ? 'animate__animated animate__fadeInLeft'
              : 'animate__animated animate__fadeOutLeft'
          } `}
        >
          <Wishlist />
        </div>
      ) : null}
      {showWishlist ? (
        <button
          type="button"
          onClick={() => setShowWishlist(false)}
          className="animate__animated animate__fadeIn animate__delay-1s btn btn-circle sm:btn-md btn-sm glass text-slate-800 shadow-md fixed top-2 sm:left-[24rem] left-[16rem] z-[1000]"
        >
          X
        </button>
      ) : null}
      <div className="navbar flex flex-row bg-gray-100 hover:bg-gray-200 border-2 border-slate-500 shadow-md rounded-lg w-[96%] mx-auto mt-3 sticky top-0 z-50">
        <div className="flex-1">
          <LinkHover
            href={{
              pathname: '/',
            }}
            active={router.pathname === '/'}
          >
            <Image
              src="/assets/images/logo.png"
              alt={'LOGO'}
              width={40}
              height={40}
            />
            <Image
              src="/assets/images/logo.png"
              alt={'LOGO'}
              width={35}
              height={35}
            />
          </LinkHover>
          <div className="flex-none p-2 hidden sm:flex">
            {menuKategori.map((item) => (
              <LinkHover
                key={item.id}
                href={{
                  pathname: item.link,
                }}
                active={router.pathname === item.link}
              >
                <span className="menu-item">{item.title}</span>
              </LinkHover>
            ))}
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-left">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <AiOutlineSearch className="w-6 h-6" />
              <div
                tabIndex={0}
                className="menu menu-compact dropdown-content sm:mt-1 sm:mr-1 mt-1 mr-[-3.5rem] bg-transparent rounded-box w-52"
              >
                <span>
                  <input
                    type="search"
                    placeholder="Search"
                    className="input input-ghost w-full max-w-xs h-10 bg-gray-200 text-slate-800 shadow-md"
                  />
                </span>
              </div>
            </label>
          </div>
          <label
            onClick={(e) => {
              e.preventDefault();
              setShowWishlist(true);
            }}
            className={`btn btn-ghost btn-circle flex ${
              user ? 'block' : 'hidden'
            }`}
          >
            <div className="indicator">
              {/* love svg */}
              <GiSelfLove className="w-6 h-6" />
              <span className="badge badge-ghost badge-sm indicator-item text-slate-50">
                {wishlistLength}
              </span>
            </div>
          </label>
          <label
            onClick={(e) => {
              e.preventDefault();
              setShowCart(true);
            }}
            className={`btn btn-ghost btn-circle flex ${
              user ? 'block' : 'hidden'
            }`}
          >
            <div className="indicator">
              {/* love svg */}
              <AiOutlineShoppingCart className="w-6 h-6" />
              <span className="badge badge-ghost badge-sm indicator-item text-slate-50">
                {cartLength}
              </span>
            </div>
          </label>
          <div className="dropdown dropdown-end">
            <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
              <AiOutlineMenu className="w-6 h-6" />
            </label>
            <ul
              tabIndex={1}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-100 rounded-box w-52"
            >
              {menuFitur.map((item) => (
                <li key={item.id}>
                  {item.title === 'Logout' ? (
                    <span
                      onClick={() => {
                        Logout();
                      }}
                      className="text-red-500"
                    >
                      {item.title}
                    </span>
                  ) : (
                    <LinkHover
                      href={{
                        pathname: item.link,
                      }}
                      active={router.pathname === item.link}
                    >
                      <span className="menu-item">{item.title}</span>
                    </LinkHover>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* kategori */}
      <div className="kategori sm:hidden flex flex-row items-center justify-center bg-gray-100 hover:bg-gray-200 border-2 border-slate-500 shadow-md rounded-lg w-[96%] mx-auto mt-1 sticky top-0 z-10">
        <div className="flex-none p-2">
          {menuKategori.map((item) => (
            <LinkHover
              key={item.id}
              href={{
                pathname: item.link,
              }}
              active={router.pathname === item.link}
            >
              <span className="menu-item">{item.title}</span>
            </LinkHover>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
