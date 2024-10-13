import React, { useState } from "react";
import Modal from "./Modal";
import "../styles/ItemMaster.css";

const ItemMaster = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [inventoryLocation, setInventoryLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [stockUnit, setStockUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [itemImages, setItemImages] = useState([]);
  const [status, setStatus] = useState("Enabled");

  const suppliers = [
    { id: 1, name: "Supplier A" },
    { id: 2, name: "Supplier B" },
    { id: 3, name: "Supplier C" },
  ];

  const stockUnits = ["pcs", "kg", "liters"];

  const handleAddItem = () => {
    const newItem = {
      itemNo: items.length + 1,
      itemName,
      inventoryLocation,
      brand,
      category,
      supplier,
      stockUnit,
      unitPrice: parseFloat(unitPrice),
      itemImages,
      status,
    };
    setItems([...items, newItem]);
    resetForm();
  };

  const resetForm = () => {
    setItemName("");
    setInventoryLocation("");
    setBrand("");
    setCategory("");
    setSupplier("");
    setStockUnit("");
    setUnitPrice("");
    setItemImages([]);
    setStatus("Enabled");
    setIsModalOpen(false);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setItemImages(files);
  };

  const selectSupplier = (supplier) => {
    setSupplier(supplier);
    setIsSupplierModalOpen(false);
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Item Master</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
      <div className="mt-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No items added.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="card">
                <h3 className="font-bold">Item No: {item.itemNo}</h3>
                <p>Name: {item.itemName}</p>
                <p>Brand: {item.brand}</p>
                <p>Category: {item.category}</p>
                <p>Supplier: {item.supplier}</p>
                <p>Stock Unit: {item.stockUnit}</p>
                <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>
                <p>Status: {item.status}</p>
                <div className="mt-2">
                  {item.itemImages.map((image, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(image)}
                      alt={`item-${i}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for adding a new item */}
      <Modal isOpen={isModalOpen} onClose={resetForm} title="Add Item">
        <div className="mb-4">
          <label className="block mb-1">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Inventory Location</label>
          <input
            type="text"
            value={inventoryLocation}
            onChange={(e) => setInventoryLocation(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Supplier</label>
          <div className="flex items-center">
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="border rounded w-full p-2"
              readOnly
              onClick={() => setIsSupplierModalOpen(true)} // Open supplier modal
            />
            <button
              onClick={() => setIsSupplierModalOpen(true)}
              className="bg-gray-300 ml-2 px-2 py-1 rounded"
            >
              Select Supplier
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Stock Unit</label>
          <select
            value={stockUnit}
            onChange={(e) => setStockUnit(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="" disabled>
              Select Stock Unit
            </option>
            {stockUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Item Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded w-full p-2"
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </Modal>

      {/* Supplier Selection Modal */}
      <Modal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        title="Select Supplier"
      >
        <ul className="space-y-2">
          {suppliers.map((sup) => (
            <li
              key={sup.id}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => selectSupplier(sup.name)}
            >
              {sup.name}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ItemMaster;
