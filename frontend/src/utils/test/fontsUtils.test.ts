import { waitForFontLoad } from "../fontUtils";

jest.useFakeTimers();

describe('waitForFontLoad', () => {
    let loadMock: jest.Mock;

  beforeEach(() => {
    loadMock = jest.fn();
    Object.assign(global.document, {
        fonts: {
            load: loadMock,
        } as unknown as FontFaceSet,
    });
  });

  it('[Given] the font load function is mocked to resolve successfully, [When] waitForFontLoad is called for "Roboto", [Then] it should resolve to true and the load function should be called with "1em Roboto".', async () => {
    document.fonts.load = jest.fn().mockResolvedValue(true);

    await expect(waitForFontLoad('Roboto')).resolves.toBe(true);

    expect(document.fonts.load).toHaveBeenCalledWith('1em Roboto');
  });

  it('[Given] the font load function is mocked to reject with an error, [When] waitForFontLoad is called for "Roboto", [Then] it should reject with the same error and the load function should be called with "1em Roboto".', async () => {
    const error = new Error('Font failed to load');
    document.fonts.load = jest.fn().mockRejectedValue(error);

    await expect(waitForFontLoad('Roboto')).rejects.toThrow(error);

    expect(document.fonts.load).toHaveBeenCalledWith('1em Roboto');
  });

  it('[Given] the font load function is mocked to never resolve, [When] waitForFontLoad is called for "Roboto" with a timeout of 1000ms, [Then] it should reject with a timeout error and the load function should be called with "1em Roboto".', async () => {
    document.fonts.load = jest.fn(() => new Promise(() => {})); // Promise that never resolves

    const promise = waitForFontLoad('Roboto', 1000);

    jest.runAllTimers();

    await expect(promise).rejects.toThrow(`Font Roboto failed to load within 1000ms`);

    expect(document.fonts.load).toHaveBeenCalledWith("1em Roboto");
  });
});