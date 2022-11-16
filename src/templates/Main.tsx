/* eslint-disable @next/next/inline-script-id */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
const Main = (props: IMainProps) => {
  const [alert, setAlert] = useState();

  const router = useRouter();
  const token = Cookies.get('token');

  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {alert && (
        <div className="max-w-[50%] bottom-2 left-2 alert shadow-lg z-[1003] fixed">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-white">{alert}</span>
          </div>
          <div className="flex-none">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/login');
              }}
              className="btn btn-sm btn-primary"
            >
              Login
            </button>
            <button
              onClick={() => setAlert('')}
              className="btn btn-sm btn-ghost glass"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {chatOpen && (
        <div className="fixed bottom-0 right-0 w-[50vw] max-h-[50vh] bg-slate-800 z-[1002] p-3 rounded-tl-lg overflow-y-scroll">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="sm:text-sm text-xs font-medium text-slate-50">
              Chat Admin
            </h1>
            <button
              onClick={() => setChatOpen(false)}
              className="btn btn-circle btn-outline btn-xs sm:btn-sm"
            >
              X
            </button>
          </div>
          <div className="flex flex-col items-start justify-start w-full overflow-y-scroll">
            <div className="flex flex-row items-center justify-start w-full mt-2">
              <span className="text-sm bg-slate-700 rounded-full p-2 mr-1">
                GNQ
              </span>
              <div className="flex flex-col items-start justify-start w-full bg-slate-700 p-2 rounded-lg">
                <h1 className="sm:text-sm text-xs font-medium text-slate-50">
                  Halo, ada yang bisa kami bantu?
                </h1>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start w-full mt-2">
              <span className="text-sm bg-slate-700 rounded-full p-2 mr-1">
                ME
              </span>
              <div className="flex flex-col items-start justify-start w-full bg-slate-700 p-2 rounded-lg">
                <h1 className="sm:text-sm text-xs font-medium text-slate-50">
                  gAK ADA tUH!{' '}
                </h1>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start mt-[4rem] mx-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="input input-bordered input-lg h-[3rem] bg-slate-50 text-slate-800"
              />
              <button className="btn btn-circle btn-outline btn-md mx-3">
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full px-1 text-slate-800 antialiased">
        {props.meta}
        {router.pathname !== '/autentikasi' && <Navbar />}
        <div className="mx-auto min-h-screen">
          <div className="content py-5 text-lg mx-5 overflow-hidden">
            {props.children}
            <button
              onClick={() => {
                if (token) {
                  setChatOpen(true);
                } else {
                  setAlert('Silahkan login terlebih dahulu');
                }
              }}
              className="btn btn-circle btn-lg bg-[#525252] fixed z-[1001] left-10 bottom-10 hover:bg-slate-800"
            >
              <span className="text-xs text-slate-50">CHAT ME</span>
            </button>
          </div>
        </div>
        {router.pathname !== '/autentikasi' && <Footer />}
      </div>
    </>
  );
};

export { Main };
