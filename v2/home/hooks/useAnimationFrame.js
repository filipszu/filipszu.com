import { useEffect, useRef } from 'react';

const useAnimationFrame = callback => {
    const requestRef = useRef();
    const nextTickTimeRef = useRef();
    
    const animate = time => {
        if(!nextTickTimeRef.current || time >= nextTickTimeRef.current){
            nextTickTimeRef.current = time + callback(time);
        }

        if(!nextTickTimeRef.current || nextTickTimeRef.current > time){
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
}

export default useAnimationFrame;