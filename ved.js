(function() {
    var root = document.documentElement;
    try { var saved = localStorage.getItem("pf-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
    document.getElementById("theme").addEventListener("click", function() {
        var dark = root.getAttribute("data-theme") ? root.getAttribute("data-theme") === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
        var next = dark ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("pf-theme", next); } catch (e) {}
    });

    var clock = document.getElementById("clock");

    function tick() {
        try { clock.textContent = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }); } catch (e) {}
    }
    tick();
    setInterval(tick, 30000);

    var btn = document.getElementById("copy"),
        txt = document.getElementById("mail-text");

    function select() { var r = document.createRange();
        r.selectNodeContents(txt); var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r); }
    btn.addEventListener("click", function() {
        function done() { btn.textContent = "Copied";
            setTimeout(function() { btn.textContent = "Copy email"; }, 1800); }
        try { navigator.clipboard.writeText(txt.textContent).then(done, select); } catch (e) { select(); }
    });
})();