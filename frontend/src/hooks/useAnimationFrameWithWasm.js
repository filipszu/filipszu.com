import { useEffect, useRef } from 'react';
import Module from '../szu';

const useAnimationFrameWithWasm = callback => {
    const requestRef = useRef();
    const nextTickTimeRef = useRef();
    const modulePromise = useRef();
    
    modulePromise.current = Module();

    const animate = (time, wasm) => {
        if(!nextTickTimeRef.current || time >= nextTickTimeRef.current){
            nextTickTimeRef.current = time + callback(time, wasm);
        }

        if(!nextTickTimeRef.current || nextTickTimeRef.current > time){
            requestRef.current = requestAnimationFrame(time => {
                animate(time, wasm);
            });
        }
    }

    useEffect(() => {
        modulePromise.current.then(wasm => {
            requestRef.current = requestAnimationFrame(time => {
                animate(time, wasm);
            });
        });
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
}

export default useAnimationFrameWithWasm;