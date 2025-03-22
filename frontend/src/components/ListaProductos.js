import React, { useEffect, useState } from 'react';
import { obtenerProductos, agregarProducto, eliminarProducto, actualizarProducto } from '../services/api';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formulario, setFormulario] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        marca: ''
    });

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const handleEliminar = async (id) => {
        try {
            await eliminarProducto(id);
            cargarProductos(); 
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const handleEditar = (producto) => {
        setProductoEditando(producto.id);
        setFormulario({ ...producto });
        setMostrarFormulario(true);
    };

    const handleGuardarEdicion = async () => {
        try {
            if (productoEditando) {
                await actualizarProducto(formulario);
            } else {
                await agregarProducto(formulario);
            }
            setProductoEditando(null);
            setFormulario({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', marca: ''});
            setMostrarFormulario(false);
            cargarProductos(); 
        } catch (error) {
            console.error("Error al guardar producto:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 transition-all"
                onClick={() => {
                    setFormulario({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', marca: '' });
                    setMostrarFormulario(!mostrarFormulario);
                    setProductoEditando(null);
                }}
            >
                {mostrarFormulario ? 'Cancelar' : 'Agregar Producto'}
            </button>

            {mostrarFormulario && (
                <div className="mt-4 p-4 border rounded bg-gray-100 shadow-md">
                    <h3 className="text-xl font-bold mb-2">{productoEditando ? 'Editar Producto' : 'Agregar Producto'}</h3>
                    <input type="text" placeholder="Nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} className="border p-2 w-full mb-2 rounded" />
                    <input type="text" placeholder="Descripción" value={formulario.descripcion} onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })} className="border p-2 w-full mb-2 rounded" />
                    <input type="number" placeholder="Precio" value={formulario.precio} onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })} className="border p-2 w-full mb-2 rounded" />
                    <input type="number" placeholder="Stock" value={formulario.stock} onChange={(e) => setFormulario({ ...formulario, stock: e.target.value })} className="border p-2 w-full mb-2 rounded" />
                    <input type="text" placeholder="Categoría" value={formulario.categoria} onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })} className="border p-2 w-full mb-2 rounded" />
                    <input type="text" placeholder="Marca" value={formulario.marca} onChange={(e) => setFormulario({ ...formulario, marca: e.target.value })} className="border p-2 w-full mb-2 rounded" />                    
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 transition-all" onClick={handleGuardarEdicion}>
                        {productoEditando ? 'Guardar Cambios' : 'Agregar Producto'}
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="mt-4 w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Nombre</th>
                            <th className="p-3 border">Descripción</th>
                            <th className="p-3 border">Precio</th>
                            <th className="p-3 border">Stock</th>
                            <th className="p-3 border">Categoría</th>
                            <th className="p-3 border">Marca</th>
                            <th className="p-3 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id} className="hover:bg-gray-100 transition-all">
                                <td className="p-3 border text-center">{producto.id}</td>
                                <td className="p-3 border">{producto.nombre}</td>
                                <td className="p-3 border">{producto.descripcion}</td>
                                <td className="p-3 border text-center">${producto.precio}</td>
                                <td className="p-3 border text-center">{producto.stock}</td>
                                <td className="p-3 border">{producto.categoria}</td>
                                <td className="p-3 border">{producto.marca}</td>
                                <td className="p-3 border flex justify-center space-x-2">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-all" onClick={() => handleEditar(producto)}>Editar</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all" onClick={() => handleEliminar(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaProductos;
