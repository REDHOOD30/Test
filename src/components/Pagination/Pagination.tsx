import React from 'react';
import styles from "./pagination.module.scss";
import vector from "../../assets/img/vector2.svg"

type PaginationProps = {
    currentIndex: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentIndex, total, onPrev, onNext }) => {

    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex === total - 1;

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination_page}>
                <span className={styles.pagination_page_number}>
                    {String(currentIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
                </span>
            </div>
            <div className={styles.scroll}>
                <span
                        className={`${styles.scrollButtonLeft} ${isPrevDisabled ? styles.disabled : ''}`}
                        role="button"
                        onClick={!isPrevDisabled ? onPrev : undefined}
                >
                    <img className={styles.scrollButtonLeft_img} src={vector} alt="scroll left"/>
                </span>
                <span
                    className={`${styles.scrollButtonRight} ${isNextDisabled ? styles.disabled : ''}`}
                    role="button"
                    onClick={!isNextDisabled ? onNext : undefined}
                >
                    <img className={styles.scrollButtonRight_img} src={vector} alt="scroll right"/>
                </span>
            </div>
        </div>
    );
};