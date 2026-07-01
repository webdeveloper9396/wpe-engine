export function injectResourceHints() {

    const hints = [
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://www.google-analytics.com"
    ];

    hints.forEach(url => {

        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = url;

        if (url.includes("gstatic")) {
            link.crossOrigin = "anonymous";
        }

        document.head.appendChild(link);
    });

    // DNS prefetch boost
    const dnsList = [
        "//fonts.googleapis.com",
        "//www.google-analytics.com"
    ];

    dnsList.forEach(url => {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = url;
        document.head.appendChild(link);
    });
}
