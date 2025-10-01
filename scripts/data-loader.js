/**
 * TerraBeyond Data Loader
 * Professional data management for exoplanet visualization
 */

class TerraBeyondData {
    constructor() {
        this.planets = [];
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;
        
        try {
            await this.loadExoplanetData();
            this.initialized = true;
            console.log('?? TerraBeyond Data loaded successfully');
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    }

    async loadExoplanetData() {
        try {
            const response = await fetch('data/processed/exoplanets.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            this.planets = await response.json();
            console.log(`?? Loaded ${this.planets.length} exoplanets`);
            
            // Update UI statistics
            this.updateStatistics();
            
        } catch (error) {
            console.warn('Using sample data:', error);
            this.loadSampleData();
        }
    }

    loadSampleData() {
        this.planets = [
            {
                "nombre": "TRAPPIST-1e",
                "descubrimiento": 2017,
                "distancia": 39.5,
                "habitable": true,
                "temperatura": 251
            }
        ];
        this.updateStatistics();
    }

    updateStatistics() {
        const total = this.planets.length;
        const habitable = this.planets.filter(p => p.habitable).length;
        
        // Update DOM if elements exist
        setTimeout(() => {
            const totalEl = document.getElementById('total-planets');
            const habitableEl = document.getElementById('habitable-planets');
            
            if (totalEl) totalEl.textContent = total;
            if (habitableEl) habitableEl.textContent = habitable;
        }, 100);
    }

    // Public API
    getAllPlanets() { return this.planets; }
    getHabitablePlanets() { return this.planets.filter(p => p.habitable); }
    searchPlanets(query) {
        return this.planets.filter(p => 
            p.nombre.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Initialize automatically
document.addEventListener('DOMContentLoaded', () => {
    window.terraBeyondData = new TerraBeyondData();
    window.terraBeyondData.initialize();
});
