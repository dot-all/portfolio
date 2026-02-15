let revealListener: (() => void) | null = null;

export const initScrollReveal = () => {
    const reveals = document.querySelectorAll(".reveal-on-scroll");

    if (revealListener) {
        window.removeEventListener("scroll", revealListener);
    }

    const revealOnScroll = () => {
        const height = window.innerHeight;
        reveals.forEach((r) => {
            if (r.getBoundingClientRect().top < height - 100) {
                r.classList.remove("opacity-0", "translate-y-[30px]");
                r.classList.add("opacity-100", "translate-y-0");
            }
        });
    };

    revealListener = revealOnScroll;
    window.addEventListener("scroll", revealListener);
    revealOnScroll();
};
