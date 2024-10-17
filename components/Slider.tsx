import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Slide {
  id: number;
  href: string;
  label: string;
  bgColor: string;
}

interface SliderProps {
  slides: Slide[];
}

export default function Slider({ slides }: SliderProps) {
  return (
    <Swiper spaceBetween={30} slidesPerView={1} loop={true}>
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="text-center">
            <a href={slide.href}>
              <button className={`${slide.bgColor} text-white px-6 py-2 rounded-lg hover:opacity-80`}>{slide.label}</button>
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}