// SWIPER
// Es un slider/ carousel que permite desplazar imágenes o contenido

// https://swiperjs.com/get-started
// https://swiperjs.com/demos

// Para instalar la dependencia ejecuta 'npm i swiper'
// Se puede utilizar en React y en otros frameworks, pero debes usar "use client"
// en el componente

// Código fuente obtenido de: https://swiperjs.com/react
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";

// Importa los estilos CSS de Swiper
import "swiper/css";

// Estilos para Thumbs Gallery
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Este ultimo es una hoja de estilos personalizada que se encuentra en la carpeta actual
// Su código fuente se obtuvo de: https://swiperjs.com/demos#thumbs-gallery
import "./slideshow.css";

import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

// Cada producto tiene 2 imagenes

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  // EL ESTILO DE THUMBS GALLERY DE SWIPER.JS
  // https://swiperjs.com/demos#thumbs-gallery

  // Para obtener el código fuente, solamente selecciona el framework y luego abrira
  // un IDE con el código y un ejemplo interactivo

  // Posee 4 hojas de estilos de swiper y 1 personalizada (que se encuentra en el archivo slideshow.css)

  // Su estado es de tipo Swiper (importado de swiper)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      {/* Muestra la imagen actual del slider */}
      <Swiper
        // Desactiva el estilo por defecto de swiper para los botones selectores de la izquierda y derecha
        // de la imagen principal
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        // Autoplay sirve para que el slider se mueva automaticamente
        autoplay={{
          // 2.5 segundos
          delay: 2500,
        }}
        // No olvidar añadir en 'modules' el modulo 'Autoplay'

        // En el caso de mostrar un error en la vista del usuario, debe usar esta propiedad
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        // Modulos importados de swiper/modules
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={1024}
              height={800}
              className="rounded-2xl object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Muestra las imagenes en miniatura */}
      <Swiper
        // En el caso de mostrar un error en la vista del usuario, debe usar esta propiedad
        // onSwiper={setThumbsSwiper}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={300}
              height={300}
              className="rounded-2xl object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
