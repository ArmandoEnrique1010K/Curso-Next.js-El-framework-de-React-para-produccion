"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

// Usa el estilo de pagination de Swiper
import "swiper/css/pagination";
import "./slideshow.css";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshowMobile = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        // style={
        //   {
        //     "--swiper-navigation-color": "#fff",
        //     "--swiper-pagination-color": "#fff",
        //   } as React.CSSProperties
        // }
        // spaceBetween={10}

        // Se define un ancho y alto para el Swiper
        style={{
          // width: "100vw"
          width: "100%",
          height: "500px",
        }}
        // navigation={true}

        // Agrega el modulo Pagination
        pagination
        autoplay={{
          delay: 2500,
        }}
        // Se elimina la propiedad thumbs porque no se está usando
        // thumbs={{
        //   swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        // }}

        // Agrega el modulo Pagination y eliminina Navigation y Thumbs
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Solamente se utiliza un Swiper para dispositivos móviles */}
    </div>
  );
};
