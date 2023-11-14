import { act, renderHook } from "@testing-library/react";
import useAnimationFrame from "../useAnimationFrame";

jest.useFakeTimers();

describe('useAnimationFrame', () => {
    let callback: jest.Mock;
    let requestAnimationFrameSpy: jest.SpyInstance;
    let cancelAnimationFrameSpy: jest.SpyInstance;

    beforeEach(() => {
        callback = jest.fn();
        requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
        cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    });

    afterEach(() => {
        requestAnimationFrameSpy.mockRestore();
        cancelAnimationFrameSpy.mockRestore();
    });
    
    it('[Given] the useAnimationFrame hook, [When] it is used, [Then] requestAnimationFrame should be called on initial render', () => {
        renderHook(() => useAnimationFrame(callback));
        expect(requestAnimationFrameSpy).toHaveBeenCalled();
    });

    it('[Given] the useAnimationFrame hook, [When] the animation frame is pending, [Then] the callback function should be called with the time', () => {
        renderHook(() => useAnimationFrame(callback));
        act(() => {jest.runOnlyPendingTimers();});
        expect(callback).toHaveBeenCalledWith(expect.any(Number));
    });

    it('[Given] the useAnimationFrame hook, [When] the component is unmounted, [Then] the animation frame should be cancelled', () => {
        const { unmount } = renderHook(() => useAnimationFrame(callback));
        unmount();
        expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    });
});