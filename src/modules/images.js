export function optimizeImages() {

    const images = document.querySelectorAll("img");

    images.forEach((img, index) => {

        const parent = img.closest("header, .hero, .banner, .above-fold");

        if (parent) {

            img.loading = "eager";
            img.fetchPriority = "high";

        } else {

            img.loading = "lazy";
        }

        img.decoding = "async";

        // prevent layout shift
        if (!img.hasAttribute("width") && img.naturalWidth) {
            img.setAttribute("width", img.naturalWidth);
        }

        if (!img.hasAttribute("height") && img.naturalHeight) {
            img.setAttribute("height", img.naturalHeight);
        }
    });
}
