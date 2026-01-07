/* =========================================================
   IMPORTS
   - fetchMenuData : Fetches menu data from data source
   - renderMenu   : Renders menu items into the DOM
   ========================================================= */
import { fetchMenuData } from "./dataService.js";
import { renderMenu } from "./renderMenu.js";

/* =========================================================
   DOM ELEMENT REFERENCES
   ========================================================= */
const menuContainer = document.getElementById("menuContainer");   // Container where menu cards are rendered
const filterButtons = document.querySelectorAll(".filter-btn");   // Category filter buttons
const mobileToggle = document.querySelector(".mobile-nav-toggle"); // Mobile menu toggle button
const navList = document.querySelector(".nav-list");              // Navigation list (links)

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
        const menuItems = await fetchMenuData(); // Fetch all menu items

        if (menuItems) {
            renderMenu(menuItems, menuContainer); // Render items into container
            animateCards();                       // Animate menu cards
        }
    } catch (error) {
        console.error("Failed to load menu", error); // Error handling
    }
}

/* =========================================================
   3. FILTERING LOGIC WITH ANIMATION
   - Filters menu items by category
   - Updates active button state
   - Re-renders menu and re-triggers animation
   ========================================================= */
filterButtons.forEach(btn => {
    btn.addEventListener("click", async (e) => {

        // Update active button UI state
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.category; // Selected category
        const allData = await fetchMenuData(); // Fetch full menu data

        // Filter menu items based on selected category
        const filtered = category === 'all'
            ? allData
            : allData.filter(item => item.category === category);

        renderMenu(filtered, menuContainer); // Render filtered menu
        animateCards();                      // Animate cards again
    });
});

/* =========================================================
   MENU CARD ANIMATION
   - Adds fade-in effect with staggered delay
   ========================================================= */
function animateCards() {
    const cards = document.querySelectorAll(".menu-card");

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("fade-in"); // Trigger CSS animation
        }, index * 100); // Stagger effect
    });
}

/* =========================================================
   SMOOTH SCROLL FOR NAVIGATION LINKS
   - Smoothly scrolls to section
   - Closes mobile menu after click
   ========================================================= */
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href')); // Target section

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });

            navList.classList.remove("active"); // Close mobile menu
        }
    });
});

/* =========================================================
   DOM CONTENT LOADED
   - Initializes application once DOM is ready
   ========================================================= */
document.addEventListener("DOMContentLoaded", init);
