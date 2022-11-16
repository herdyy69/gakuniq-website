/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Swipers = () => {
  const dataCarousel = [
    {
      id: 1,
      title: 'NEW SEASON NEW STYLE',
      desc: 'JANGAN LEWATKAN KOLEKSI SEASON MUSIM DINGIN KAMI!',
      background:
        'https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_960_720.jpg',
      href: '#',
    },
    {
      id: 2,
      title: 'NEW YEAR NEW OUTFIT',
      desc: 'blablablablabla',
      background:
        'https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_960_720.jpg',
      href: '#',
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg"
      >
        {dataCarousel.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="bg-cover bg-center w-full h-full"
              style={{ backgroundImage: `url(${item.background})` }}
            >
              <div className="flex flex-col justify-center items-center md:items-start h-full mx-5">
                <h1 className="text-base md:text-3xl font-bold text-white">
                  {item.title}
                </h1>
                <span className="text-white text-sm md:text-lg">
                  {item.desc}
                </span>
                <a
                  href={item.href}
                  className="btn glass bg-slate-300 text-slate-800 mt-3"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Swipers;
