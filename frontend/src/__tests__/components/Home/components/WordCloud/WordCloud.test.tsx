import { render, screen } from "@testing-library/react";
import 'jest-canvas-mock';
import WordCloud from "../../../../../components/Home/components/WordCloud/WordCloud";

describe('WordCloud', () => {
    type FunctionsToMock = {
        fillText?: jest.FunctionLike;
        measureText?: jest.FunctionLike;
        drawImage?: jest.FunctionLike;
    };
    const mockCanvas = (functionsToMock: FunctionsToMock) => {
        const mockFillText = functionsToMock.fillText || jest.fn(),
            mockMeasureText = functionsToMock.measureText || jest.fn(() => ({ width: 100 })),
            mockDrawImage = functionsToMock.drawImage || jest.fn();


        window.HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation((contextId) => {
            if (contextId === '2d') {
                return {
                  fillText: mockFillText,
                  measureText: mockMeasureText,
                  drawImage: mockDrawImage,
                  // Add any other methods that you use in your component
                  // Add all other necessary properties with mock values
                };
              }
              // Handle other contextIds if necessary
              return null;
            });
    };
    
    it('renders a canvas element', () => {
        render(<WordCloud />);
        const canvas = screen.getByTestId('word-cloud-canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('[Given] the WordCloud component with default words, [When] it is rendered, [Then] canvas.fillText should be called with the correct default words', () => {
        // Mock the canvas and its context
        const mockFillText = jest.fn();
        mockCanvas({
            fillText: mockFillText
        });

        // Render the component
        render(<WordCloud />);

        // Check if fillText was called with the correct arguments
        expect(mockFillText).toHaveBeenCalledWith('Javascript', expect.any(Number), expect.any(Number));
        expect(mockFillText).toHaveBeenCalledWith('Typescript', expect.any(Number), expect.any(Number));
    });

    it('[Given] the WordCloud component with custom words, [When] it is rendered, [Then] canvas.fillText should be called with the correct words', () => {
        // Mock the canvas and its context
        const mockFillText = jest.fn();
        mockCanvas({
            fillText: mockFillText
        });

        // Render the component
        render(<WordCloud wordsTags={[{name: 'test'}, {name: 'test2'}]}/>);

        // Check if fillText was called with the correct arguments
        expect(mockFillText).toHaveBeenCalledWith('test', expect.any(Number), expect.any(Number));
        expect(mockFillText).toHaveBeenCalledWith('test2', expect.any(Number), expect.any(Number));
    });

});