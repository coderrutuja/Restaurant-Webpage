/* =========================================================
   IMPORTS
   - fetchMenuData : Fetches menu data from data source
   - renderMenu   : Renders menu items into the DOM
   ========================================================= */
import { fetchMenuData } from "./dataService.js";
import { renderMenu } from "./renderMenu.js";

//  GLOBAL STATE (SINGLE SOURCE OF TRUTH)
let menuItems = [];
let activeCategory = "all";

/* =========================================================
   DOM ELEMENT REFERENCES
   ========================================================= */
const menuContainer = document.getElementById("menuContainer");   // Container where menu cards are rendered
const filterButtons = document.querySelectorAll(".filter-btn");   // Category filter buttons
const mobileToggle = document.querySelector(".mobile-nav-toggle"); // Mobile menu toggle button
const navList = document.querySelector(".nav-list");              // Navigation list (links)
const searchInput = document.getElementById("searchInput");

/* =========================================================
   1. MOBILE NAVIGATION TOGGLE
   - Toggles mobile menu visibility
   - Switches icon between hamburger and close
   ========================================================= */
mobileToggle.addEventListener("click", () => {
    navList.classList.toggle("active"); // Show / hide navigation menu

    const icon = mobileToggle.querySelector("i"); // Font Awesome icon inside toggle button
    icon.classList.toggle("fa-bars");   // Toggle hamburger icon
    icon.classList.toggle("fa-times");  // Toggle close icon
});

/* =========================================================
   2. INITIALIZE MENU
   - Fetches menu data on page load
   - Renders menu items
   - Triggers card animations
   ========================================================= */
async function init() {
    try {
        menuItems = await fetchMenuData(); // Fetch all menu items

        if (menuItems.length) {
            renderMenu(menuItems, menuContainer); // Render items into container
            animateCards();                       // Animate menu cards
        }
    } catch (error) {
        console.error("Failed to load menu", error); // Error handling
    }
}

/* =========================================================
   3. SEARCH + CATEGORY FILTER (COMBINED LOGIC)
   ========================================================= */
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredItems = menuItems.filter(item => {
        const matchesCategory =
            activeCategory === "all" || item.category === activeCategory;

        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    renderMenu(filteredItems, menuContainer);
    animateCards();
}

/* =========================================================
   4. CATEGORY FILTER BUTTONS
   ========================================================= */
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        activeCategory = btn.dataset.category;
        applyFilters();
    });
});

/* =========================================================
   5. SEARCH INPUT HANDLER
   ========================================================= */
searchInput.addEventListener("input", applyFilters);

/* =========================================================
   MENU CARD ANIMATION
   ========================================================= */
function animateCards() {
    const cards = document.querySelectorAll(".menu-card");

    cards.forEach((card, index) => {
        card.classList.remove("fade-in");
        setTimeout(() => {
            card.classList.add("fade-in");
        }, index * 100);
    });
}

/* =========================================================
   SMOOTH SCROLL FOR NAVIGATION LINKS
   ========================================================= */
document.querySelectorAll(".nav-link").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
        });

        navList.classList.remove("active");
    });
});

/* =========================================================
   DOM CONTENT LOADED
   ========================================================= */
document.addEventListener("DOMContentLoaded", init);
