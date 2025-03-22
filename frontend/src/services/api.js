const API_URL = "http://localhost:5000/api/productos";

export const obtenerProductos = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
    }
};

export const agregarProducto = async (producto) => {
    try {
        const response = await fetch("http://localhost:5000/api/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                stock: producto.stock,
                categoria: producto.categoria,
                marca: producto.marca
            }),
        });
        return await response.json();
    } catch (error) {
        console.error("❌ Error al agregar producto:", error);
    }
};

export const actualizarProducto = async (producto) => {
    try {
        const response = await fetch(`${API_URL}/${producto.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto),
        });
        return await response.json();
    } catch (error) {
        console.error("❌ Error al actualizar producto:", error);
    }
};

export const eliminarProducto = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (error) {
        console.error("❌ Error al eliminar producto:", error);
    }
};
