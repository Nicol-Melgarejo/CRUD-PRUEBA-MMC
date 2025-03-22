const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos
router.get('/', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results);
    });
});

// Agregar un producto
router.post('/', (req, res) => {
    const { nombre, descripcion, precio, stock, categoria, marca } = req.body;

    if (!nombre || !precio || !stock) {
        return res.status(400).json({ error: 'Nombre, precio y stock son obligatorios' });
    }

    const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, marca) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, descripcion, precio, stock, categoria, marca], (err, result) => { 
        if (err) {
            console.error('❌ Error al agregar producto:', err);
            return res.status(500).json({ error: 'Error al agregar producto' });
        }
        res.json({ message: '✅ Producto agregado con éxito', id: result.insertId });
    });
});



// Actualizar un producto
router.put('/:id', (req, res) => {
    const { nombre, descripcion, precio, stock, categoria, marca } = req.body;
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ error: 'Nombre, precio y stock son obligatorios' });
    }
    const sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, categoria=?, marca=? WHERE id=?';

    db.query(sql, [nombre, descripcion, precio, stock, categoria, marca, req.params.id], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        res.json({ message: 'Producto actualizado con éxito' });
    });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM productos WHERE id=?', [req.params.id], (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        res.json({ message: 'Producto eliminado con éxito' });
    });
});

module.exports = router;
