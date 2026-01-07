/* =========================================================
   FETCH MENU DATA
   - Fetches menu items from local JSON file
   - Handles network and parsing errors safely
   ========================================================= */
export async function fetchMenuData() {
    try {
        // Send request to fetch menu data
        const response = await fetch("data/menu.json");

        // Check if response is successful
        if (!response.ok) throw new Error("Failed to load menu");

        // Parse and return JSON data
        return await response.json();
    } catch (error) {
        // Log error for debugging
        console.error(error);

        // Return empty array as fallback to prevent app crash
        return [];
    }
}
