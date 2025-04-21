import React from 'react';
import styles from "./events.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


type Event = {
    date: number;
    description: string;
};

type EventsProps = {
    events: Event[];
};

export const Events: React.FC<EventsProps> = ({ events }) => {

    return (
        <div className={styles.wrapper}>
            <div className={`swiper-button-prev`} ></div>
            <Swiper
                freeMode={true}
                modules={[Navigation]}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                spaceBetween={80}
                slidesPerView={3}
                className={styles.all}
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div className={styles.event}>
                            <div className={styles.event_year}>{event.date}</div>
                            <div className={styles.event_text}>{event.description}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={`swiper-button-next`}></div>
        </div>
    );
};