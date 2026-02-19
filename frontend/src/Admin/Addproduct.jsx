import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/products/add", form);

    alert(res.data.message);

    navigate("/allproduct");

    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="title" placeholder="Title"
            value={form.title} onChange={handleChange}
            className="w-full border p-2 rounded" />

          <textarea name="description" placeholder="Description"
            value={form.description} onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="price" type="number" placeholder="Price"
            value={form.price} onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="category" placeholder="Category"
            value={form.category} onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="image" placeholder="Image URL"
            value={form.image} onChange={handleChange}
            className="w-full border p-2 rounded" />

          <input name="stock" type="number" placeholder="Stock"
            value={form.stock} onChange={handleChange}
            className="w-full border p-2 rounded" />

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default Addproduct;
