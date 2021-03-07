import { useEffect, useRef } from 'react';

const useAnimationFrame = callback => {
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const nextTickTimeRef = useRef();
    
    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            if(!nextTickTimeRef.current || time >= nextTickTimeRef.current){
                nextTickTimeRef.current = time + callback(time);
            }
        }
        previousTimeRef.current = time;
        if(nextTickTimeRef.current === undefined || nextTickTimeRef.current > time){
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
}

export default useAnimationFrame;