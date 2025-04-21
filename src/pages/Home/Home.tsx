import React, { useRef, useState} from 'react';
import gsap from 'gsap';
import styles from "./home.module.scss";
import {Time} from "../../components/Time/time";
import {Date} from "../../components/Date/Date";
import {Events} from "../../components/Events/Events";
import {Pagination} from "../../components/Pagination/Pagination";

const dateList = {
    1: {
        label: 'Наука',
        number: 1,
        startDate: 1990,
        endDate: 1993,
        events: [
            {date:1990,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"},
            {date:1991,description:"Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"},
            {date:1992,description:"Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"},
            {date:1993,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"}
        ]
    },
    2: {
        label: 'Культура',
        number: 2,
        startDate: 1986,
        endDate: 1989,
        events: [
            {date:1986,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"},
            {date:1987,description:"Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"},
            {date:1988,description:"Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"},
            {date:1989,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"}
        ]
    },
    3: {
        label: 'История',
        number: 3,
        startDate: 1982,
        endDate: 1985,
        events: [
            {date:1982,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"},
            {date:1983,description:"Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"},
            {date:1984,description:"Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"},
            {date:1985,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"}
        ]
    },
    4: {
        label: 'Общество',
        number: 4,
        startDate: 1978,
        endDate: 1981,
        events: [
            {date:1978,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"},
            {date:1979,description:"Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"},
            {date:1980,description:"Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi"},
            {date:1981,description:"13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"}
        ]
    }
}


export const Home: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const circleRef = useRef<HTMLDivElement>(null);
    const activePointRef = useRef<HTMLDivElement | null>(null);
    const dateRef = useRef<HTMLDivElement | null>(null);
    const eventsRef = useRef<HTMLDivElement | null>(null);
    const hoverRefs = useRef<Array<HTMLDivElement | null>>([]);

    const radius = 265;
    const fixedAngleDeg = 45;

    const dateArray = Object.values(dateList);
    const anglePerPoint = 360 / dateArray.length;
    const activePoint = dateArray[activeIndex];



    const handleClick = (newIndex: number) => {
        if (newIndex === activeIndex) return;

        const targetRotation = newIndex * anglePerPoint;

        gsap.to(circleRef.current, {
            rotate: -targetRotation,
            duration: 0.5,
            ease: "power2.inOut",
            onStart: () => {
                gsap.to(
                    activePointRef.current, {
                        duration: 0.5,
                        ease: "power2.inOut",
                        rotate: activeIndex * -90,
                    });

                hoverRefs.current.forEach((el) => {
                        gsap.to(
                            el, {
                                duration: 0.5,
                                ease: "power2.inOut",
                                rotate: newIndex * 90,
                            })
                    }
                )
            },
            onComplete: () => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        setRotation(-targetRotation);
                        setActiveIndex(newIndex);

                        if (dateRef.current) {
                            gsap.fromTo(dateRef.current,
                                {opacity: 0, y: -10},
                                {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"}
                            );
                        }

                        if (eventsRef.current) {
                            gsap.fromTo(eventsRef.current,
                                {opacity: 0, y: -10},
                                {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"}
                            );
                        }

                        // if (activePointRef.current) {
                        //     gsap.fromTo(activePointRef.current,
                        //         { scale: 0.5, opacity: 0 },
                        //         { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
                        //     );
                        // }


                    if (dateRef.current) {
                            tl.to(dateRef.current, {
                                opacity: 0,
                                y: -10,
                                duration: 0.5,
                                ease: "power2.in"
                            }, 0);
                        }

                        if (eventsRef.current) {
                            tl.to(eventsRef.current, {
                                opacity: 0,
                                y: -10,
                                duration: 0.5,
                                ease: "power2.in"
                            }, 0);
                        }
                    }
                })
            }
        });
    };

    return (
        <div className={styles.main}>
            <div className={styles.all}>
                <div className={styles.all_horizontally} />
                <div className={styles.all_vertical} />
                <div className={styles.all_circle} />
                <div className={styles.multicolor} />
                <div className={styles.header}>
                    <span className={styles.header_text}>Исторические даты</span>
                </div>
                <div className={styles.date} ref={dateRef}>
                    <Date startDate={activePoint.startDate} endDate={activePoint.endDate} />
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        currentIndex={activeIndex}
                        total={dateArray.length}
                        onPrev={() => handleClick(Math.max(0, activeIndex - 1))}
                        onNext={() => handleClick(Math.min(dateArray.length - 1, activeIndex + 1))}
                    />
                </div>
                <div className={styles.event} ref={eventsRef}>
                    <Events events={activePoint.events} />
                </div>

                <div className={styles.circleWrapper}>
                    <div
                        className={styles.circlePoints}
                        ref={circleRef}
                        style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}
                    >
                        {dateArray.map((point, index) => {
                            const angle = index * anglePerPoint;
                            const angleRad = (angle - fixedAngleDeg) * (Math.PI / 180);
                            const x = radius * Math.cos(angleRad);
                            const y = radius * Math.sin(angleRad);
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={index}
                                    className={styles.pointWrapper}
                                    style={{
                                        position: 'absolute',
                                        left: `calc(50% + ${x}px)`,
                                        top: `calc(50% + ${y}px)`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onClick={() => handleClick(index)}
                                    // onMouseEnter={() => {
                                    //     setHoveredIndex(index);
                                    //     if (hoverRefs.current[index]) {
                                    //         gsap.to(
                                    //             hoverRefs.current[index],
                                    //             { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out"}
                                    //         );
                                    //     }
                                    // }}
                                    // onMouseLeave={() => {
                                    //     setHoveredIndex(null);
                                    //     if (hoverRefs.current[index]) {
                                    //         gsap.to(
                                    //             hoverRefs.current[index],
                                    //             { scale: 0.5, opacity: 0, duration: 0.5, ease: "power2.in"}
                                    //         );
                                    //     }
                                    // }}
                                >
                                    {isActive ? (
                                        <div
                                            style={{ transform: `rotate(${-rotation}deg)` }}
                                            ref={activePointRef}
                                        >
                                            <Time number={point.number} label={point.label} />
                                        </div>
                                    ) : (
                                        <>
                                            <div className={styles.pointDot} />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    //opacity: hoveredIndex === index ? 1 : 0,
                                                }}
                                                ref={(el) => { hoverRefs.current[index] = el; }}
                                            >
                                                <Time number={point.number} label={point.label} onlyNumber rotation={activeIndex * 90}/>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;