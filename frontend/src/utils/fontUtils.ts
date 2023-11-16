/**
 * Waits for a font to load, and resolves or rejects a Promise based on the result.
 *
 * @param {string} font - The name of the font to load.
 * @param {number} [timeout=5000] - The maximum time to wait for the font to load, in milliseconds.
 * @returns {Promise<boolean>} A Promise that resolves to true if the font loads successfully within the timeout period, or rejects with an Error if the font fails to load or the timeout period is exceeded.
 * @throws {Error} Will throw an error if the font fails to load within the timeout period.
 * @example
 * waitForFontLoad('Roboto', 3000)
 *   .then(() => console.log('Font loaded successfully'))
 *   .catch((e) => console.log(`Font failed to load: ${e.message}`));
 */
export async function waitForFontLoad(
    font: string,
    timeout = 5000,
) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Font ${font} failed to load within ${timeout}ms`));
        }, timeout);
        document.fonts.load(`1em ${font}`).then(() => {
            resolve(true);
        }).catch((e) => {
            reject(e);
        });
    });
}
