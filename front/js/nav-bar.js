
let prevScrollPos = window.pageYOffset;
const nav = document.querySelector(".navbar");

window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        nav.style.top = "0";
    } else {
        nav.style.top = "-100px";
    }

    prevScrollPos = currentScrollPos;
};
