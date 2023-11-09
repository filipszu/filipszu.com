const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const shouldResize = canvas && 
        canvas instanceof HTMLCanvasElement && 
        width > 0 && height > 0 &&
        (canvas.width !== width || canvas.height !== height);
    if(shouldResize){
        canvas.width = width;
        canvas.height = height;
        canvas.style.width  = `${width}px`;
        canvas.style.height = `${height}px`;
    }
};

export {
    resizeCanvas
}