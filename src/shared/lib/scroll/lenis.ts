import Lenis from "lenis";

declare global {
    interface Window {
        lenis: Lenis;
    }
}

let lenis: Lenis | null = null;
let rafId: number | null = null;

export const initLenis = () => {
    if (lenis) {
        lenis.destroy();
        if (rafId) cancelAnimationFrame(rafId);
    }

    lenis = new Lenis();
    window.lenis = lenis;

    function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
};
