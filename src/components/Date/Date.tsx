import React from 'react';
import styles from "./date.module.scss";

interface DateProps {
    startDate: number;
    endDate: number;
}

export const Date: React.FC<DateProps> = ({ startDate, endDate }) => {
    return (
        <div className={styles.date}>
            <span className={styles.start}>{startDate}</span>
            <span className={styles.end}>{endDate}</span>
        </div>
    );
};

