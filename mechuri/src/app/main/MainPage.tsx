'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import Introduce from '@/components/main/Introduce';
import ChatBot from '@/components/main/ChatBot';
import FoodChoice from '@/components/main/FoodChoice';
import FoodMap from '@/components/main/FoodMap';
import Roulette from '@/components/main/Roulette';
export default function MainPage() {
  return (
    <div className="flex h-full w-4/5">
      <Swiper
        className="mySwiper"
        direction={'vertical'}
        navigation={true}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        autoHeight={true}
        modules={[Pagination, EffectFade, Navigation, Mousewheel, Autoplay]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Introduce />
        </SwiperSlide>
        <SwiperSlide>
          <Roulette />
        </SwiperSlide>
        <SwiperSlide>
          <FoodChoice />
        </SwiperSlide>
        <SwiperSlide>
          <ChatBot />
        </SwiperSlide>
        <SwiperSlide>
          <FoodMap />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
