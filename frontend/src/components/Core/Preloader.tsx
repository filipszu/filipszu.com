import { FC, PropsWithChildren, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { waitForFontLoad } from "../../utils/fonts";
export const DEFAULT_FONT_NAME = "MyPhoneN1280Regular";
export type PreloaderProps = {};
const Preloader: FC<PropsWithChildren<PreloaderProps>> = ({children}) => {
    const [compBody, setCompBody] = useState(<div className="preloader"><h1>Preloading!</h1></div>); 
    useEffect(() => {
        waitForFontLoad(DEFAULT_FONT_NAME).then(() => {
            setCompBody(children as ReactElement);
        });
    }, [compBody, children, setCompBody]);
    return compBody;
};
export default Preloader;
