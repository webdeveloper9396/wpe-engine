(function () {

    const links = document.querySelectorAll('link[rel="stylesheet"]');

    links.forEach(link => {
        if (!link.href.includes("critical")) {
            link.media = "print";
            link.onload = () => link.media = "all";
        }
    });

    console.log("[WPE] CSS optimized");

})();
