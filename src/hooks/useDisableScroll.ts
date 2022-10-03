import { useEffect } from 'react';

export const useDisableScroll = (open: boolean) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);
};