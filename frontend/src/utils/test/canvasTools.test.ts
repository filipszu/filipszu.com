import { resizeCanvas } from "../canvasTools";

type FunctionsToMock = {
    fillText?: jest.FunctionLike;
    measureText?: jest.FunctionLike;
    drawImage?: jest.FunctionLike;
    clearRect?: jest.FunctionLike;
    scale?: jest.FunctionLike;
};
export const mockCanvas = (functionsToMock: FunctionsToMock) => {
    const mockFillText = functionsToMock.fillText || jest.fn(),
        mockMeasureText = functionsToMock.measureText || jest.fn(() => ({ width: 100 })),
        mockDrawImage = functionsToMock.drawImage || jest.fn(),
        clearRect = functionsToMock.clearRect || jest.fn(),
        scale = functionsToMock.scale || jest.fn();


    window.HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation((contextId) => {
        if (contextId === '2d') {
            return {
              fillText: mockFillText,
              measureText: mockMeasureText,
              drawImage: mockDrawImage,
              clearRect: clearRect,
              scale: scale,
              // Add any other methods that you use in your component
              // Add all other necessary properties with mock values
            };
          }
          // Handle other contextIds if necessary
          return null;
        });
};


describe('resizeCanvas', () => {
  let canvas: HTMLCanvasElement;
    let mockedScale = jest.fn();
  beforeEach(() => {
    mockCanvas({
        scale: mockedScale
    });
    canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
  });

  it('[Given] a canvas with dimensions 100x100, [When] the new dimensions are 200x200, [Then] the canvas should be resized to 200x200.', () => {
    resizeCanvas(canvas, 200, 200);

    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);
    expect(canvas.style.width).toBe('200px');
    expect(canvas.style.height).toBe('200px');
  });

  it('[Given] a canvas with dimensions 100x100, [When] the new dimensions are the same (100x100), [Then] the canvas should not be resized.', () => {
    resizeCanvas(canvas, 100, 100);

    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(100);
    expect(canvas.style.width).toBe('100px');
    expect(canvas.style.height).toBe('100px');
  });

  it('[Given] a canvas with dimensions 100x100, [When] the new dimensions are invalid (-100, 0), [Then] the canvas should not be resized.', () => {
    resizeCanvas(canvas, -100, 0);

    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(100);
    expect(canvas.style.width).toBe('100px');
    expect(canvas.style.height).toBe('100px');
  });

  it('[Given] a canvas with dimensions 100x100, [When] the new dimensions are 200x200, [Then] the canvas context should be scaled to account for device pixel ratio.', () => {
    resizeCanvas(canvas, 200, 200);

    expect(mockedScale).toHaveBeenCalledWith(1, 1);
  });
});