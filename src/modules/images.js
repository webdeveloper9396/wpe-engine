(function () {

    const images = document.querySelectorAll("img");

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const img = entry.target;

            if (img.dataset.src) {
                img.src = img.dataset.src;
            }

            img.loading = "lazy";
            img.decoding = "async";

            obs.unobserve(img);
        });
    }, {
        rootMargin: "200px"
    });

    images.forEach(img => io.observe(img));

    console.log("[WPE] Images optimized");

})();
