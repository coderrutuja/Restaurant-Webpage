/* =========================================================
   RENDER MENU
   - Dynamically creates and displays menu cards
   - Accepts menu data and target container as parameters
   ========================================================= */
export function renderMenu(items, container) {

    // Clear existing menu items before rendering new ones
    container.innerHTML = "";
    
    // Loop through each menu item
    items.forEach(item => {

        // Create article element for a single menu card
        const article = document.createElement("article");
        article.className = "menu-card";

        // Inject menu card HTML structure
        article.innerHTML = `
            <div class="menu-image-wrapper">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-info">
                <div class="menu-header">
                    <h3>${item.name}</h3>
                    <span class="price">₹${item.price}</span>
                </div>
                <p class="menu-description">${item.description}</p>
                <button class="btn primary btn-sm w-100 order-btn" data-id="${item.id}">
                    <i class="fas fa-plus"></i> Add to Order
                </button>
            </div>
        `;

        // Append the menu card to the container
        container.appendChild(article);
    });
}
