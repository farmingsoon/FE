import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (fetchMoreFunc:() => void) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        if(typeof window === "undefined"){
            return;
        };

        const handleScroll = () => {
            setLastScrollTop(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            const isScrollingUp = window.scrollY < lastScrollTop;
            if(firstEntry.isIntersecting && isScrollingUp){
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
            window.removeEventListener('scroll', handleScroll)
            if(currentRef){
                observer.unobserve(currentRef)
            }
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchMoreFunc, lastScrollTop])


    return observerRef;
}