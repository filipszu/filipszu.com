import { act, renderHook } from "@testing-library/react";
import useAnimationFrame from "../../components/Home/hooks/useAnimationFrame";

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

    it('should call requestAnimationFrame on initial render', () => {
        renderHook(() => useAnimationFrame(callback));
        expect(requestAnimationFrameSpy).toHaveBeenCalled();
    });

    it('should call the callback function with the time', () => {
        renderHook(() => useAnimationFrame(callback));
        act(() => {jest.runOnlyPendingTimers();});
        expect(callback).toHaveBeenCalledWith(expect.any(Number));
    });

    it('should cancel the animation frame when the component is unmounted', () => {
        const { unmount } = renderHook(() => useAnimationFrame(callback));
        unmount();
        expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    });
});