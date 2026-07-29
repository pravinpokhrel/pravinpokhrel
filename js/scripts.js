"use strict";

const menuButton = document.getElementById("menu-button");
const mainNavigation = document.getElementById("main-navigation");
const themeButton = document.getElementById("theme-button");
const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();

menuButton.addEventListener("click", function () {
    const menuIsOpen = mainNavigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
});

mainNavigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        mainNavigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const savedTheme = localStorage.getItem("pravin-site-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    const activeTheme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";

    localStorage.setItem("pravin-site-theme", activeTheme);
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(function (element) {
    observer.observe(element);
});
