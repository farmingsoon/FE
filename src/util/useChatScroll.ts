import { useEffect, useRef } from 'react';

export const useChatScroll = (fetchMoreFunc:any ) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    // const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if(typeof window === "undefined"){
            return;
        };

        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting)
            {
                // setIsFetching(true);
                // fetchMoreFunc().then(() => {
                //     setIsFetching(false)
                // })
                fetchMoreFunc();
            }
        }, { threshold: 1.0 });


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
    }, [fetchMoreFunc]);


    return observerRef
}