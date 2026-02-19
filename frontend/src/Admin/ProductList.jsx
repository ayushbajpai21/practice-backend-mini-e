import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // ================= FETCH PRODUCTS =================
  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await API.delete(`/products/delete/${id}`);
    getProducts();
  };

  // ================= EDIT OPEN =================
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put(`/products/update/${editProduct._id}`, editProduct);

    setShowModal(false);
    getProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Product Management
        </h2>

        <button
          onClick={() => navigate("/addproduct")}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* PRODUCT INFO */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-14 h-14 rounded-lg object-cover shadow"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {p._id.slice(-10)}
                    </p>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {p.category}
                  </span>
                </td>

                {/* PRICE */}
                <td className="p-4 font-semibold text-gray-700">
                  ₹{p.price}
                </td>

                {/* STOCK */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      p.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.stock > 0
                      ? `${p.stock} In Stock`
                      : "Out of Stock"}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center p-10 text-gray-500">
            No products available
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                name="title"
                value={editProduct.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="category"
                value={editProduct.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="price"
                value={editProduct.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="stock"
                value={editProduct.stock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 px-4 py-2 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 text-white rounded"
                >
                  Update
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
