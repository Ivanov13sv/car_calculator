import { FC } from 'react';
import { INotification } from 'types/INotification';
import { Notification } from './Notification';
import styles from './style.module.scss';

interface INotifications{
    notifications: INotification[];
    removeNotification: (id: number) => void;
}

export const NotificationProvider: FC<INotifications> = ({notifications,removeNotification}) => {

    return (
        <div className={styles.notificationOverlay}>
            {notifications.map((item) => (
                <Notification key={item.id} removeNotification={removeNotification} {...item} />
            ))}
        </div>
    );
};
