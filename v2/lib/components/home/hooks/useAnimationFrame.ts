import { useEffect, useRef } from "react";

/**
 * A hook wrapper around `requestAnimationFrame`.
 * Accepts an `useAnimationFrameCallback` as an argument.
 * Similair to `FrameRequestCallback` will be called before the browser performs a repaint.
 * The `number` returned from **the callback** will be the amount of miliseconds before the next callback call.
 *
 * **Example of use:**
 * * If you want an animation to run every 25ms keep returning 25 from **the callback**.
 * ```
 * useAnimationFrame(time => {
 *      // do something cool
 *      return 25;
 * });
 * ```
 * * If you want to cancel the animation frame return 0 from **the callback**.
 * ```
 * useAnimationFrame(time => {
 *      // do something just once
 *      return 0;
 * });
 * ```
 * @param callback `useAnimationFrameCallback` - **The callback** that will be called before a browser repaint.
 */
const useAnimationFrame = (callback: useAnimationFrameCallback) => {
  const requestRef = useRef(0);
  const nextTickTimeRef = useRef(0);

  const animate: FrameRequestCallback = (time) => {
    if (!nextTickTimeRef.current || time >= nextTickTimeRef.current) {
      nextTickTimeRef.current = time + callback(time);
    }

    if (!nextTickTimeRef.current || nextTickTimeRef.current > time) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};

/**
 * **The callback** that will be called.
 * Similair to `FrameRequestCallback` from `requestAnimationFrame`
 * It is intended to perform some logic based on time i.e. an animation.
 * The returned `number` will be the timeout in miliseconds before next time **the callback** function gets called.
 * Returning `0` will stop calling **the callback** and cause `cancelAnimationFrame` to be called under the hood.
 * @param time The DOMHighResTimeStamp from requestAnimationFrame.
 * @return The number of miliseconds before the next call.
 */
export type useAnimationFrameCallback = (time: DOMHighResTimeStamp) => number;

export default useAnimationFrame;
