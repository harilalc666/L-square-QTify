import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";
import LeftIcon from '../../assets/left-arrow.svg';
import RightIcon from '../../assets/right-arrow.svg';

const Carousel = ({ data, renderCard, slidesPerViewConfig }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy(); // rebind to custom buttons
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className={styles.carouselContainer}>
      {/* Left Navigation Button */}
      <button ref={prevRef} className={styles.navButton}>
        <img src={LeftIcon} alt="Left" />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        loop={data.length > 5}        
        breakpoints={slidesPerViewConfig}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className={styles.swiperContainer}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.cardWrapper}>
              {renderCard(item)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Navigation Button */}
      <button ref={nextRef} className={styles.navButton}>
        <img src={RightIcon} alt="Right" />
      </button>
    </div>
  );
};

export default Carousel;
