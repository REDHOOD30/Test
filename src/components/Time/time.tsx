import React from 'react';
import styles from "./time.module.scss";

interface TimeProps {
    number: number;
    label: string;
    onlyNumber?: boolean;
    rotation?: number;
}

export const Time: React.FC<TimeProps> = ({ number, label, onlyNumber, rotation }) => {
    return (
        <div className={styles.pointWithLabel}>
            <div
                className={styles.pointWithLabel_number}
            >
                {number}
            </div>
            {!onlyNumber &&<span className={styles.pointWithLabel_label}>{label}</span>}
        </div>
    );
};