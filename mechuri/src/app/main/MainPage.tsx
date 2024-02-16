'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import Introduce from '@/components/main/Introduce';
export default function MainPage() {
  return (
    <div className="h-full">
      <Swiper
        // className="mySwiper"
        // direction={'vertical'}
        navigation={true}
        mousewheel={true}
        // effect={'fade'}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, EffectFade, Navigation, Mousewheel, Autoplay]}
        // centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {/* <SwiperSlide>
          <Introduce />
        </SwiperSlide>
        <SwiperSlide>
          <Introduce />
        </SwiperSlide>
        <SwiperSlide>
          <Introduce />
        </SwiperSlide>
        <SwiperSlide>
          <Introduce />
        </SwiperSlide>
        <SwiperSlide>
          <Introduce />
        </SwiperSlide> */}
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
