const db = require('../config/db');

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener productos' });
        } else {
            res.json(results);
        }
    });
};

// Obtener un producto por ID
exports.obtenerProducto = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener el producto' });
        } else {
            res.json(result[0]);
        }
    });
};

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
    const { nombre, descripcion, precio, stock, categoria, marca } = req.body;
    db.query('INSERT INTO productos (nombre, descripcion, precio, stock, categoria, marca ) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, precio, stock, categoria, marca],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al crear el producto' });
            } else {
                res.json({ id: result.insertId, ...req.body });
            }
        });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria, marca } = req.body;
    db.query('UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, categoria=?, marca=? WHERE id=?',
        [nombre, descripcion, precio, stock, categoria, marca, id],
        (err) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el producto' });
            } else {
                res.json({ id, ...req.body });
            }
        });
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id=?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
            res.json({ message: 'Producto eliminado correctamente' });
        }
    });
};
 
