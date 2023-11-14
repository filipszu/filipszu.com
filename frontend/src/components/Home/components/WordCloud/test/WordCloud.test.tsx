import { render, screen } from "@testing-library/react";
import 'jest-canvas-mock';
import WordCloud from "../WordCloud";
import { mockCanvas } from "../../../../../utils/test/canvasTools.test";

describe('WordCloud', () => {
        
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