import React, {useState} from 'react';
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

    const [activeIndex, setActiveIndex] = useState(3);
    const centerX = 720;
    const centerY = 480;
    const radius = 265;

    const dateArray = Object.values(dateList);
    const activePoint = dateArray[activeIndex];

    return (
        <div className={styles.main}>
            <div className={styles.all}>
                <div className={styles.all_horizontally}/>
                <div className={styles.all_vertical}/>
                <div className={styles.all_circle}/>
                <div className={styles.multicolor}/>
                <div className={styles.header}>
                    <span className={styles.header_text}>Исторические даты</span>
                </div>
                <div className={styles.date}>
                    <Date startDate={activePoint.startDate} endDate={activePoint.endDate} />
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        currentIndex={activeIndex}
                        total={dateArray.length}
                        onPrev={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                        onNext={() => setActiveIndex((prev) => Math.min(dateArray.length - 1, prev + 1))}
                    />
                </div>
                <div className={styles.event}>
                    <Events events={activePoint.events} />
                </div>
               {Object.values(dateList).map((point, index) => {
                        const baseAngle = Math.PI / 4;
                        const angle = baseAngle + (index / dateArray.length) * 2 * Math.PI;
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);
                return (
                <div
                    key={index}
                    className={styles.pointWrapper}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    onClick={() => setActiveIndex(index)}
                >
                    {activeIndex === index ? (
                        <Time number={point.number} label={point.label} />
                    ) : (
                        <div className={styles.pointDot} />
                    )}
                </div>
                )})}
            </div>
        </div>
    );
};

export default Home;