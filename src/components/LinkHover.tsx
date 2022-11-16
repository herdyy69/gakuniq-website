import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

interface Props {
  href;
  children;
  active;
}

const LinkHover: FC<Props> = ({ active = false, children, ...props }) => (
  <Link legacyBehavior {...props}>
    <a
      className={`inline-flex items-center px-[0.3rem] pt-1 pb-[0.20rem] border-y-[2.5px] rounded-sm text-xs font-medium leading-5 focus:outline-none transition duration-150 ease-in-out mx-1 ${
        active
          ? ' text-slate-800 border-slate-500'
          : 'border-transparent hover:text-slate-800 hover:border-slate-500'
      }`}
    >
      {children}
    </a>
  </Link>
);

export default LinkHover;
