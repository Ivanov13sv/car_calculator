import { useEffect, useRef } from 'react';

export const useDetectClickOutside = (handler: () => void) => {
    const domNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const maybeHandler = (event: any) => {
            if (!domNode.current?.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener('mousedown', maybeHandler);

        return () => {
            document.removeEventListener('mousedown', maybeHandler);
        };
        // eslint-disable-next-line
    }, []);

    return domNode;
};