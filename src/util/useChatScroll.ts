import { useEffect, useRef, useState } from 'react';

export const useChatScroll = (fetchMoreFunc:any ) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if(typeof window === "undefined"){
            return;
        };

        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && !isFetching)
            {
                setIsFetching(true);
                fetchMoreFunc().then(() => {
                    setIsFetching(false)
                })
            }
        }, { threshold: 0 });


        const currentRef = observerRef.current;
        if(currentRef)
        {
            observer.observe(currentRef)
        }

        return () => {
            if(currentRef)
            {
                observer.unobserve(currentRef)
            }
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    // useEffect(() => {
    //     if(!isFetching) return;
    //     fetchMoreFunc().then(() => setIsFetching(false))

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isFetching]);


    return observerRef
}