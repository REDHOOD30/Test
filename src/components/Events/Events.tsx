import React, {useEffect, useRef, useState} from 'react';
import styles from "./events.module.scss";
import vector from "../../assets/img/vector.svg"


type Event = {
    date: number;
    description: string;
};

type EventsProps = {
    events: Event[];
};

export const Events: React.FC<EventsProps> = ({ events }) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
        }
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        updateScrollButtons();

        const handleScroll = () => updateScrollButtons();
        container.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateScrollButtons);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <span
                className={styles.scrollButtonBack}
                onClick={canScrollLeft ? scrollLeft : undefined}
                style={{ visibility: canScrollLeft ? 'visible' : 'hidden' }}
                role="button"
            >
                <img className={styles.scrollButtonBack_img} src={vector} alt="scroll left" />
            </span>

            <div className={styles.all} ref={scrollRef}>
                {events.map((event, index) => (
                    <div key={index} className={styles.event}>
                        <span className={styles.event_year}>{event.date}</span>
                        <span className={styles.event_text}>{event.description}</span>
                    </div>
                ))}
            </div>

            <span
                className={styles.scrollButtonNext}
                onClick={canScrollRight ? scrollRight : undefined}
                style={{ visibility: canScrollRight ? 'visible' : 'hidden' }}
                role="button"
            >
                <img className={styles.scrollButtonNext_img} src={vector} alt="scroll right" />
            </span>
        </div>
    );
};