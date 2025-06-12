const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // XAMPP default
    database: 'moonmoisture_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// GET all formulas
app.get('/api/formulas', (req, res) => {
    const query = `
        SELECT f.*, 
               GROUP_CONCAT(
                   CONCAT(fi.ingredient_name, ':', fi.percentage, ':', fi.phase)
                   SEPARATOR '|'
               ) as ingredients_data
        FROM formulas f
        LEFT JOIN formula_ingredients fi ON f.id = fi.formula_id
        GROUP BY f.id
        ORDER BY f.created_at DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Transform the data to match your current format
        const formattedResults = {};
        results.forEach(row => {
            const ingredients = [];
            if (row.ingredients_data) {
                row.ingredients_data.split('|').forEach(item => {
                    const [name, percent, phase] = item.split(':');
                    ingredients.push({
                        name,
                        percent: parseFloat(percent),
                        phase,
                        id: Date.now() + Math.random()
                    });
                });
            }
            
            formattedResults[row.name] = {
                ingredients,
                fragranceSplits: JSON.parse(row.fragrance_splits || '{}'),
                version: row.version,
                created_at: row.created_at
            };
        });
        
        res.json(formattedResults);
    });
});

// POST save formula
app.post('/api/formulas', (req, res) => {
    const { name, ingredients, fragranceSplits, batchSize } = req.body;
    
    // Check if formula exists to handle versioning
    const checkQuery = 'SELECT MAX(version) as max_version FROM formulas WHERE name = ?';
    db.query(checkQuery, [name], (err, versionResult) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const nextVersion = (versionResult[0].max_version || 0) + 1;
        
        // Insert new formula version
        const formulaQuery = `
            INSERT INTO formulas (name, version, total_batch_size, fragrance_splits, notes) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        db.query(formulaQuery, [
            name, 
            nextVersion, 
            batchSize, 
            JSON.stringify(fragranceSplits),
            `Version ${nextVersion} - Auto saved`
        ], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const formulaId = result.insertId;
            
            // Insert ingredients
            if (ingredients && ingredients.length > 0) {
                const ingredientPromises = ingredients
                    .filter(ing => ing.name && ing.percent) // Only save complete ingredients
                    .map(ing => {
                        return new Promise((resolve, reject) => {
                            const query = `
                                INSERT INTO formula_ingredients 
                                (formula_id, ingredient_name, percentage, phase) 
                                VALUES (?, ?, ?, ?)
                            `;
                            db.query(query, [formulaId, ing.name, ing.percent, ing.phase], (err, result) => {
                                if (err) reject(err);
                                else resolve(result);
                            });
                        });
                    });
                
                Promise.all(ingredientPromises)
                    .then(() => res.json({ 
                        id: formulaId, 
                        version: nextVersion,
                        message: 'Formula saved successfully' 
                    }))
                    .catch(err => res.status(500).json({ error: err.message }));
            } else {
                res.json({ 
                    id: formulaId, 
                    version: nextVersion,
                    message: 'Formula saved successfully' 
                });
            }
        });
    });
});

// DELETE formula
app.delete('/api/formulas/:name', (req, res) => {
    const { name } = req.params;
    
    // Get formula IDs to delete related ingredients
    const getIdsQuery = 'SELECT id FROM formulas WHERE name = ?';
    db.query(getIdsQuery, [name], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const formulaIds = results.map(row => row.id);
        
        if (formulaIds.length === 0) {
            return res.status(404).json({ error: 'Formula not found' });
        }
        
        // Delete ingredients first (foreign key constraint)
        const deleteIngredientsQuery = `DELETE FROM formula_ingredients WHERE formula_id IN (${formulaIds.map(() => '?').join(',')})`;
        db.query(deleteIngredientsQuery, formulaIds, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Then delete formulas
            const deleteFormulaQuery = 'DELETE FROM formulas WHERE name = ?';
            db.query(deleteFormulaQuery, [name], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Formula deleted successfully' });
            });
        });
    });
});

// GET ingredients catalog (for future use)
app.get('/api/ingredients', (req, res) => {
    const query = `
        SELECT i.*, s.name as supplier_name 
        FROM ingredients i 
        LEFT JOIN suppliers s ON i.supplier_id = s.id
        ORDER BY i.name
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});