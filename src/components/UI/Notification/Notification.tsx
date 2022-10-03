import { FC, useEffect, useState } from 'react';
import { INotification } from 'types/INotification';
import styles from './style.module.scss';

interface NotificationProps extends INotification {
    removeNotification: (id: number) => void;
}

export const Notification: FC<NotificationProps> = ({
    id,
    message,
    type,
    removeNotification,
}) => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalId] = useState<NodeJS.Timer | null>(null);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5;
                }
                clearInterval(id);
                return prev;
            });
        }, 20);

        setIntervalId(id);
    };

    const handlePauseTimer = () => {
        if (intervalID) {
            clearInterval(intervalID);
        }
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            removeNotification(id);
        }, 400);
    };

    useEffect(() => {
        if (width === 100) handleCloseNotification();
        //eslint-disable-next-line
    }, [width]);

    useEffect(() => {
        handleStartTimer();
    }, []);

    const notificationClasses = exit
        ? `${styles.notificationItem} ${styles.exit}`
        : `${styles.notificationItem} ${styles[type]}`;

    return (
        <div className={styles.notificationWrapper}>
            <div
                className={notificationClasses}
                onMouseEnter={handlePauseTimer}
                onMouseLeave={handleStartTimer}
            >
                <p>{message}</p>
                <button className={styles.closeBtn} onClick={handleCloseNotification}>x</button>

                <div className={styles.bar} style={{ width: `${width}%` }} />
            </div>
        </div>
    );
};
