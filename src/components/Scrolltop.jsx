import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
//----------------- Scrolltop ---------------//
const Scrolltop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        const scrollToTop = () => {
            const appContainer = document.querySelector('.app_container') || 
        document.querySelector('.app');
    if (appContainer){
        appContainer.scrollTo({ top: 0, left: 0, behavior: 'instant'});

    }
    window.scrollTo({ top: 0 , left: 0, behavior:'instant'});
     document.documentElement.scrollTo(0,0);
     };
     scrollToTop();
     const timer = setTimeout(scrollToTop,10);
     return() => clearTimeout(timer);
    },[pathname]);
    return null;
};
export default Scrolltop;