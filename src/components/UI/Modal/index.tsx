import { useDetectClickOutside } from 'hooks/useDetectClickOutside';
import { useDisableScroll } from 'hooks/useDisableScroll';
import { FC } from 'react';
import { ModalProps } from 'types/IModal';
import styles from './style.module.scss';

export const Modal: FC<ModalProps> = ({
    children,
    isOpen = false,
    setOpen,
}) => {
    useDisableScroll(isOpen);

    const ref = useDetectClickOutside(() => setOpen(false));

    return (
        <div className={styles.overlay}>
            <div ref={ref} className={styles.modal}>
                {children}
            </div>
        </div>
    );
};
