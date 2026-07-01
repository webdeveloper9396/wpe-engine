export function criticalCSSBoost() {

    const style = document.createElement("style");

    style.innerHTML = `
        /* Reduce render blocking */
        html, body {
            opacity: 1 !important;
            visibility: visible !important;
        }

        /* Improve rendering performance */
        img {
            content-visibility: auto;
            contain-intrinsic-size: 300px;
        }

        /* Reduce layout shift */
        * {
            box-sizing: border-box;
        }
    `;

    document.head.appendChild(style);
}
