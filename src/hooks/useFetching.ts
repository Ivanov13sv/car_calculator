import { useState } from 'react';

export const useFetching = (callback: () => void): any[] => {
    const [isLoading, setLoading] = useState(false);

    const fetching = async () => {
        setLoading(true);
        await callback();
        setLoading(false);
    };

    return [fetching, isLoading];
};
