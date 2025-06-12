const API_BASE = 'http://localhost:5000/api';

export const formulaAPI = {
    // Get all saved formulas (replaces localStorage.getItem)
    getSavedFormulas: async () => {
        try {
            const response = await fetch(`${API_BASE}/formulas`);
            if (!response.ok) throw new Error('Failed to fetch formulas');
            return await response.json();
        } catch (error) {
            console.error('Error fetching formulas:', error);
            // Fallback to localStorage if server is down
            const data = localStorage.getItem("savedFormulas");
            return data ? JSON.parse(data) : {};
        }
    },
    
    // Save formula (replaces localStorage.setItem)
    saveFormula: async (name, ingredients, fragranceSplits, batchSize) => {
        try {
            const response = await fetch(`${API_BASE}/formulas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    ingredients,
                    fragranceSplits,
                    batchSize
                })
            });
            
            if (!response.ok) throw new Error('Failed to save formula');
            return await response.json();
        } catch (error) {
            console.error('Error saving formula:', error);
            // Fallback to localStorage
            const savedFormulas = JSON.parse(localStorage.getItem("savedFormulas") || '{}');
            savedFormulas[name] = { ingredients, fragranceSplits };
            localStorage.setItem("savedFormulas", JSON.stringify(savedFormulas));
            return { message: 'Saved to localStorage as fallback' };
        }
    },
    
    // Delete formula (replaces localStorage manipulation)
    deleteFormula: async (name) => {
        try {
            const response = await fetch(`${API_BASE}/formulas/${encodeURIComponent(name)}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete formula');
            return await response.json();
        } catch (error) {
            console.error('Error deleting formula:', error);
            // Fallback to localStorage
            const savedFormulas = JSON.parse(localStorage.getItem("savedFormulas") || '{}');
            delete savedFormulas[name];
            localStorage.setItem("savedFormulas", JSON.stringify(savedFormulas));
            return { message: 'Deleted from localStorage as fallback' };
        }
    },
    
    // Get ingredients catalog (for future enhancement)
    getIngredients: async () => {
        try {
            const response = await fetch(`${API_BASE}/ingredients`);
            if (!response.ok) throw new Error('Failed to fetch ingredients');
            return await response.json();
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            return [];
        }
    }
};