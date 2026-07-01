(function () {

    const conn = navigator.connection || {};

    console.log("[WPE] Network:", conn.effectiveType || "unknown");

})();
