let observer: IntersectionObserver | null = null;

export const initScrollSpy = () => {
    if (observer) {
        observer.disconnect();
    }

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            const title = document.querySelector(
                `.scroll-spy-title[data-section="${id}"]`,
            );

            if (entry.isIntersecting) {
                if (id === "contact") {
                    title?.classList.add("text-white");
                } else {
                    title?.classList.add("text-neutral-900", "dark:text-white");
                }
                title?.classList.remove("text-gray-400");
            } else {
                if (id === "contact") {
                    title?.classList.remove("text-white");
                } else {
                    title?.classList.remove("text-neutral-900", "dark:text-white");
                }
                title?.classList.add("text-gray-400");
            }
        });
    }, observerOptions);

    document.querySelectorAll("section[id], footer[id]").forEach((section) => {
        observer?.observe(section);
    });
};
