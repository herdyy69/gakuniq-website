/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable unused-imports/no-unused-vars */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useState } from 'react';

const Alert: FC<Props> = ({ ...props }) => {
  const router = useRouter();
  const token = Cookies.get('token');
  const [alert, setAlert] = useState(props.alert);

  return (
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
        {token ? (
          // auto close alert
          <button onClick={props.close} className="btn btn-sm btn-ghost glass">
            Close
          </button>
        ) : (
          <>
            <button
              onClick={props.close}
              className="btn btn-sm btn-ghost glass"
            >
              Close
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/autentikasi');
              }}
              className="btn btn-sm btn-primary"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Alert;
