import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (fetchMoreFunc:() => void) => {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(typeof window === "undefined"){
            return;
        };

        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];

            if(firstEntry.isIntersecting ){
                fetchMoreFunc();
    
            }
        }, {
            threshold: 1.0
        });
    
        const currentRef = observerRef.current;
        if(currentRef){
            observer.observe(currentRef);
        };

        return () => {

            if(currentRef){
                observer.unobserve(currentRef)
            }
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchMoreFunc])


    return observerRef;
}