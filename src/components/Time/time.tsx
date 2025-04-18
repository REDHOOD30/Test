import React from 'react';
import styles from "./time.module.scss";

interface TimeProps {
    number: number;
    label: string;
}

export const Time: React.FC<TimeProps> = ({ number, label }) => {
    return (
        <div className={styles.pointWithLabel}>
            <div className={styles.pointWithLabel_number}>{number}</div>
            <span className={styles.pointWithLabel_label}>{label}</span>
        </div>
    );
};